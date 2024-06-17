import BossStaffManagement from '~/pages/admin/Boss/StaffManagement';

function StaffManagement() {
    return (
        <div className='w-full'>
            <div className='w-full' style={{
                padding: '30px',
                height: 'max(calc(100vh - var(--admin-layout-header-height)), 100%)',
                backgroundColor: 'var(--background-color)',
            }}>
                <BossStaffManagement />
            </div>
        </div>
    );
}

export default StaffManagement;