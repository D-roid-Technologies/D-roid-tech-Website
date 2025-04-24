import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/Store";
import { Project } from "../../../utils/Types";
// import "../../pages/startproject/StartProjectPage.css";
import "../../pages/startproject/StartProject.css";
import { Assets } from "../../../utils/constant/Assets";

const ProjectSection = () => {
  const projects = useSelector((state: RootState) => state.projects.projects);

  const renderProjectsByStatus = (status: Project["status"]) => {
    const filteredProjects = projects.filter(
      (project) => project.status === status
    );

    if (filteredProjects.length === 0) {
      return (
        <div className="text-center p-4 text-gray-500 italic">
          No projects with this status
        </div>
      );
    }

    return filteredProjects.map((project) => (
      <div key={project.id} className="project-card">
        {/* <div className="project-image">
          {project.imageUrl ? (
            <img
              src={project.imageUrl}
              alt={project.title}
              className="project-thumbnail"
            />
          ) : (
            "/static/media/client.bb9e845446.c63a1a96d.png"
          )}
        </div> */}
        <h4 className="project-title">{project.title}</h4>
        {project.summary && (
          <p className="project-description">{project.summary}</p>
        )}
        <a href={project.descriptionUrl} className="project-link">
          View Description
        </a>
      </div>
    ));
  };

  return (
    <section className="projects-container">
      <div className="container">
        <h2 className="projects-heading">
          <span className="projects-title-span">PROJECTS</span>
        </h2>

        <div className="projects-grid">
          <div className="project-column">
            <div className="project-column-header completed-header">
              <h3>Completed</h3>
            </div>
            <div className="project-list">
              {renderProjectsByStatus("Completed")}
            </div>
          </div>

          <div className="project-column ">
            <div className="project-column-header ongoing-header">
              <h3>Ongoing</h3>
            </div>
            <div className="project-list">
              {renderProjectsByStatus("Ongoing")}
            </div>
          </div>

          <div className="project-column">
            <div className="project-column-header communication-header">
              <h3>In Communication</h3>
            </div>
            <div className="project-list">
              {renderProjectsByStatus("In Communication")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
