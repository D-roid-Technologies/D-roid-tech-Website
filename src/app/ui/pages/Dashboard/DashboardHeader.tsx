import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/Store';
import { LocationState, UserType } from '../../../utils/Types';

const DashboardHeader: React.FC = () => {
    const location: LocationState = useSelector((state: RootState) => state.location);
    const userDetails: UserType = useSelector((state: RootState) => state.user);
    return (
        <div
            style={{
                backgroundColor: '#071D6A',
                color: '#FFFFFF',
                padding: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <h2 style={{ fontWeight: '800' }}>D'roid One Dashboard</h2>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: "20px"
            }}>

                <span>
                    {location.principalSubdivision}
                </span>
                <div
                    style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: '#FFFFFF',
                        color: '#071D6A',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontWeight: '800',
                        fontSize: '18px',
                    }}
                >

                    {`${userDetails.firstName[0]}${userDetails.lastName[0]}`}
                </div>
            </div>

        </div>
    )
}

export default DashboardHeader