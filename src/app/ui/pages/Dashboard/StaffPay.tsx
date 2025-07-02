import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux';
import { calculateNetSalary } from '../../../redux/configuration/auth.service';
import { Entry } from '../../../redux/slices/SignInAndOutSlice';
import { RootState } from '../../../redux/Store';
import {StaffPaySlip} from './StaffPaySlip';

const StaffPay: React.FunctionComponent = () => {
    const user = useSelector((state: RootState) => state.user);
    const userLogs = useSelector((state: RootState) => state.SignInO.staffSignInAndOut as Entry[]);
    const today = new Date();
    const todayMonth = new Date().getMonth()
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 9);
    const thisMonth = new Date(today.getFullYear(), today.getMonth(), 9);

    const paidSalary = calculateNetSalary(userLogs, 70000)
    return (
        <div>
            <StaffPaySlip
                employeeName={`${user.firstName} ${user.middleName} ${user.lastName}`}
                employeeId={user.uniqueId}
                payPeriodStart={lastMonth}
                payPeriodEnd={thisMonth}
                totalDeductions={paidSalary?.totalDeductions || 10}
                netSalary={paidSalary?.netSalary || 10}
                GSalary={paidSalary?.grossSalary || 10}
                taxesPercent={12}
                todayMonth={todayMonth}
                sNumber={user.streetNumber}
                sName={user.streetName}
                city={user.city}
                state={user.state}
                country={user.country}
            />
        </div>
    )
}

export default StaffPay