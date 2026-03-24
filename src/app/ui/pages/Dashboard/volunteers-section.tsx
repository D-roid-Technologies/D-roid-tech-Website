import React, { useState, useEffect, useMemo } from "react";
import { Plus, Users, Clock, UserCheck, Award, Edit, Trash2, Search, UserPlus } from "lucide-react";
import styles from "./volunteers.module.css";
import { Modal } from "./micro-ui/modal";
import { ConfirmationDialog } from "./micro-ui/confirmation-dialog";
import { EmptyState } from "./micro-ui/empty-state";
import { StatCard } from "./micro-ui/stat-card";
import { SearchFilter } from "./micro-ui/search-filter";
import toast from "react-hot-toast";

// Firebase Imports
import { doc, getDoc, updateDoc, arrayUnion, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../../../firebase";
import { authService } from "../../../redux/configuration/auth.service";

export interface Volunteer {
  id: string; // Unique string ID for the array
  uid?: string; // If added via Unique ID
  name: string;
  email: string;
  phone: string;
  department: string;
  skills: string;
  hours: number;
  status: "Active" | "Inactive" | "Pending";
  joinDate: string;
  availability: string;
  isManual: boolean;
}

const statusOptions = [
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
  { label: "Pending", value: "Pending" },
];

const availabilityOptions = [
  { label: "Weekends", value: "Weekends" },
  { label: "Weekdays", value: "Weekdays" },
  { label: "Evenings", value: "Evenings" },
  { label: "Flexible", value: "Flexible" },
];

export const VolunteersSection: React.FC = () => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal & UI State
  const [modalOpen, setModalOpen] = useState(false);
  const [addMode, setAddMode] = useState<"search" | "manual">("search");
  const [editingVolunteer, setEditingVolunteer] = useState<Volunteer | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [volunteerToDelete, setVolunteerToDelete] = useState<string | null>(null);
  
  // Filters
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState("");

  // Add via Unique ID State
  const [searchUniqueId, setSearchUniqueId] = useState("");
  const [searchedUser, setSearchedUser] = useState<any | null>(null);
  const [isSearchingId, setIsSearchingId] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    skills: "",
    availability: "",
    status: "Pending" as "Pending" | "Active" | "Inactive",
  });

  // --- 1. FETCH DATA (REAL-TIME) ---
  useEffect(() => {
    const fetchOrgData = () => {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      const userDocRef = doc(db, "droidaccount", currentUser.uid);
      
      const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          const orgData = data.user?.organisation || {};
          
          setVolunteers(orgData.volunteers || []);
          setDepartments(orgData.departments || []);
        }
        setIsLoading(false);
      });

      return () => unsubscribe();
    };

    fetchOrgData();
  }, []);

  // --- 2. DERIVED DATA ---
  const filteredVolunteers = useMemo(() => {
    return volunteers.filter((volunteer) => {
      const matchesSearch =
        volunteer.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        volunteer.email.toLowerCase().includes(searchValue.toLowerCase()) ||
        volunteer.department.toLowerCase().includes(searchValue.toLowerCase());
      const matchesFilter = !filterValue || volunteer.status === filterValue;
      return matchesSearch && matchesFilter;
    });
  }, [volunteers, searchValue, filterValue]);

  const stats = useMemo(() => {
    const active = volunteers.filter((v) => v.status === "Active").length;
    const totalHrs = volunteers.reduce((sum, v) => sum + (v.hours || 0), 0);
    const pending = volunteers.filter((v) => v.status === "Pending").length;
    const retentionRate = volunteers.length > 0 ? Math.round((active / volunteers.length) * 100) : 0;
    
    return {
      activeVolunteers: active.toString(),
      totalHours: totalHrs.toString(),
      pendingApplications: pending.toString(),
      retentionRate: `${retentionRate}%`,
    };
  }, [volunteers]);

  // --- 3. SEARCH BY UNIQUE ID ---
  const handleSearchUniqueId = async () => {
    if (!searchUniqueId.trim()) return toast.error("Please enter a Unique ID");
    
    setIsSearchingId(true);
    setSearchedUser(null);

    try {
      const user = await authService.searchMemberByUniqueId(searchUniqueId);
      if (user) {
        setSearchedUser(user);
        // Pre-fill form with found data
        setFormData(prev => ({
          ...prev,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          phone: user.phone || "",
        }));
        toast.success("Member found!", { style: { background: "#4BB543", color: "#fff" }});
      }
    } catch (error) {
      // Error handled by authService
    } finally {
      setIsSearchingId(false);
    }
  };

  // --- 4. FORM HANDLERS ---
  const openModal = (volunteer?: Volunteer) => {
    if (volunteer) {
      setEditingVolunteer(volunteer);
      setAddMode(volunteer.isManual ? "manual" : "search");
      setFormData({
        name: volunteer.name,
        email: volunteer.email,
        phone: volunteer.phone,
        department: volunteer.department,
        skills: volunteer.skills,
        availability: volunteer.availability,
        status: volunteer.status,
      });
      if (!volunteer.isManual) {
        setSearchedUser({ firstName: volunteer.name.split(" ")[0], lastName: volunteer.name.split(" ")[1], email: volunteer.email });
      }
    } else {
      resetForm();
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", phone: "", department: "", skills: "", availability: "", status: "Pending" });
    setEditingVolunteer(null);
    setSearchedUser(null);
    setSearchUniqueId("");
    setAddMode("search");
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // --- 5. SAVE TO FIREBASE ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    if (!formData.department) return toast.error("Please select or enter a department");
    if (addMode === "search" && !searchedUser && !editingVolunteer) return toast.error("Please search and select a valid member first.");

    try {
      const userDocRef = doc(db, "droidaccount", currentUser.uid);
      const userSnap = await getDoc(userDocRef);
      const currentVols = userSnap.data()?.user?.organisation?.volunteers || [];

      if (editingVolunteer) {
        // Update
        const updatedVols = currentVols.map((v: Volunteer) => 
          v.id === editingVolunteer.id 
            ? { ...v, ...formData } 
            : v
        );
        await updateDoc(userDocRef, { "user.organisation.volunteers": updatedVols });
        toast.success("Volunteer updated successfully");
      } else {
        // Add New
        const newVolunteer: Volunteer = {
          id: crypto.randomUUID(),
          uid: addMode === "search" ? searchedUser.uniqueId : undefined,
          isManual: addMode === "manual",
          ...formData,
          hours: 0,
          joinDate: new Date().toISOString(),
        };
        await updateDoc(userDocRef, { "user.organisation.volunteers": arrayUnion(newVolunteer) });
        toast.success("Volunteer added successfully");
      }
      closeModal();
    } catch (error: any) {
      toast.error(`Error saving volunteer: ${error.message}`);
    }
  };

  // --- 6. DELETE LOGIC ---
  const confirmDelete = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser || !volunteerToDelete) return;

    try {
      const userDocRef = doc(db, "droidaccount", currentUser.uid);
      const updatedVols = volunteers.filter((v) => v.id !== volunteerToDelete);
      await updateDoc(userDocRef, { "user.organisation.volunteers": updatedVols });
      
      toast.success("Volunteer removed successfully");
      setVolunteerToDelete(null);
      setDeleteConfirmOpen(false);
    } catch (error: any) {
      toast.error(`Failed to delete: ${error.message}`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.sectionHeader}>
        <div>
          <h1 className={styles.sectionTitle}>Volunteers</h1>
          <p className={styles.sectionDescription}>Manage volunteer recruitment, departments, and activities</p>
        </div>
        <button className={`${styles.button} ${styles.buttonPrimary}`} onClick={() => openModal()}>
          <Plus size={16} /> Add Volunteer
        </button>
      </div>

      <div className={styles.statsGrid}>
        <StatCard title="Active Volunteers" value={isLoading ? "..." : stats.activeVolunteers} change="Currently Active" icon={Users} />
        <StatCard title="Total Hours" value={isLoading ? "..." : stats.totalHours} change="Logged contribution" icon={Clock} />
        <StatCard title="Pending Applications" value={isLoading ? "..." : stats.pendingApplications} change="Awaiting approval" icon={UserCheck} />
        <StatCard title="Retention Rate" value={isLoading ? "..." : stats.retentionRate} change="Overall retention" icon={Award} />
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Volunteer Directory ({filteredVolunteers.length})</h2>
          <SearchFilter
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            filterValue={filterValue}
            onFilterChange={setFilterValue}
            filterOptions={statusOptions}
            placeholder="Search name, email, department..."
            filterLabel="Filter by status"
          />
        </div>
        
        <div className={styles.cardContent}>
          {isLoading ? (
             <div className={styles.emptyState}>Loading volunteers...</div>
          ) : filteredVolunteers.length === 0 ? (
            <EmptyState
              title="No volunteers found"
              description={searchValue || filterValue ? "Try adjusting your search criteria." : "No volunteers have been registered yet."}
            />
          ) : (
            <div className={styles.responsiveTableContainer}>
              <table className={styles.table}>
                <thead className={styles.tableHeader}>
                  <tr>
                    <th className={styles.tableHeaderCell}>Name</th>
                    <th className={styles.tableHeaderCell}>Department</th>
                    <th className={styles.tableHeaderCell}>Contact Info</th>
                    <th className={styles.tableHeaderCell}>Skills & Avail.</th>
                    <th className={styles.tableHeaderCell}>Hours</th>
                    <th className={styles.tableHeaderCell}>Status</th>
                    <th className={styles.tableHeaderCell}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVolunteers.map((volunteer) => (
                    <tr key={volunteer.id} className={styles.tableRow}>
                      <td className={`${styles.tableCell} ${styles.tableCellBold}`}>
                        {volunteer.name}
                        {volunteer.isManual && <span className={styles.manualTag}> (Manual)</span>}
                      </td>
                      <td className={styles.tableCell}>{volunteer.department}</td>
                      <td className={styles.tableCell}>
                        <div>{volunteer.email}</div>
                        <div className={styles.subText}>{volunteer.phone}</div>
                      </td>
                      <td className={styles.tableCell}>
                        <div>{volunteer.skills}</div>
                        <div className={styles.subText}>{volunteer.availability}</div>
                      </td>
                      <td className={styles.tableCell}>{volunteer.hours}h</td>
                      <td className={styles.tableCell}>
                        <span className={`${styles.badge} ${styles[`badge${volunteer.status}`]}`}>
                          {volunteer.status}
                        </span>
                      </td>
                      <td className={styles.tableCell}>
                        <div className={styles.tableActions}>
                          <button className={styles.actionButton} onClick={() => openModal(volunteer)}><Edit size={16} /></button>
                          <button className={`${styles.actionButton} ${styles.actionButtonDanger}`} onClick={() => { setVolunteerToDelete(volunteer.id); setDeleteConfirmOpen(true); }}><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* --- ADD / EDIT MODAL --- */}
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        title={editingVolunteer ? "Edit Volunteer" : "Add New Volunteer"}
        description="Assign a volunteer to a department"
      >
        {!editingVolunteer && (
          <div className={styles.modeToggle}>
            <button 
              type="button" 
              className={`${styles.modeBtn} ${addMode === "search" ? styles.modeActive : ""}`} 
              onClick={() => setAddMode("search")}
            >
              <Search size={16} /> Link via Unique ID
            </button>
            <button 
              type="button" 
              className={`${styles.modeBtn} ${addMode === "manual" ? styles.modeActive : ""}`} 
              onClick={() => setAddMode("manual")}
            >
              <UserPlus size={16} /> Enter Manually
            </button>
          </div>
        )}

        {/* Search Input Section (Only if adding via ID) */}
        {!editingVolunteer && addMode === "search" && !searchedUser && (
          <div className={styles.searchSection}>
            <label className={styles.label}>Member Unique ID</label>
            <div className={styles.searchRow}>
              <input
                className={styles.input}
                placeholder="Enter D'roid Member ID"
                value={searchUniqueId}
                onChange={(e) => setSearchUniqueId(e.target.value)}
              />
              <button 
                type="button" 
                className={`${styles.button} ${styles.buttonPrimary}`} 
                onClick={handleSearchUniqueId}
                disabled={isSearchingId}
              >
                {isSearchingId ? "Searching..." : "Search"}
              </button>
            </div>
          </div>
        )}

        {/* Found User Preview */}
        {addMode === "search" && searchedUser && (
          <div className={styles.foundUserCard}>
             <p className={styles.foundUserName}>{searchedUser.firstName} {searchedUser.lastName}</p>
             <p className={styles.foundUserEmail}>{searchedUser.email}</p>
             {!editingVolunteer && <button type="button" className={styles.linkBtn} onClick={() => setSearchedUser(null)}>Change Member</button>}
          </div>
        )}

        {/* The Form */}
        {((addMode === "search" && searchedUser) || addMode === "manual") && (
          <form onSubmit={handleSubmit} className={styles.formStack}>
            
            {addMode === "manual" && (
              <>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Full Name *</label>
                  <input className={styles.input} required value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Email *</label>
                  <input type="email" className={styles.input} required value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Phone Number *</label>
                  <input type="tel" className={styles.input} required value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} />
                </div>
              </>
            )}

            <div className={styles.formGroup}>
              <label className={styles.label}>Department / Team *</label>
              {departments.length > 0 ? (
                 <select className={styles.select} required value={formData.department} onChange={(e) => handleInputChange("department", e.target.value)}>
                   <option value="">Select a Department</option>
                   {departments.map((dep, idx) => (
                     <option key={idx} value={dep.name}>{dep.name}</option>
                   ))}
                   <option value="General">General / Unassigned</option>
                 </select>
              ) : (
                <input className={styles.input} required placeholder="e.g., Medical Team, Logistics..." value={formData.department} onChange={(e) => handleInputChange("department", e.target.value)} />
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Skills *</label>
              <input className={styles.input} required placeholder="e.g. Teaching, Nursing, Driving..." value={formData.skills} onChange={(e) => handleInputChange("skills", e.target.value)} />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Availability *</label>
              <select className={styles.select} required value={formData.availability} onChange={(e) => handleInputChange("availability", e.target.value)}>
                <option value="">Select availability</option>
                {availabilityOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Status</label>
              <select className={styles.select} value={formData.status} onChange={(e) => handleInputChange("status", e.target.value as any)}>
                {statusOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>

            <div className={styles.modalActions}>
              <button type="button" className={`${styles.button} ${styles.buttonSecondary}`} onClick={closeModal}>Cancel</button>
              <button type="submit" className={`${styles.button} ${styles.buttonPrimary}`}>
                {editingVolunteer ? "Update Volunteer" : "Save Volunteer"}
              </button>
            </div>
          </form>
        )}
      </Modal>

      <ConfirmationDialog
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Remove Volunteer"
        message="Are you sure you want to remove this volunteer? This action cannot be undone."
        confirmText="Remove"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
};