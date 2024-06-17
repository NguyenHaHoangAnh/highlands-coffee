import BossAreaManagement from '~/pages/admin/Boss/AreaManagement';

function AreaManagement() {
    return (
        <div className='w-full'>
            <div className='w-full' style={{
                padding: '30px',
                height: 'max(calc(100vh - var(--admin-layout-header-height)), 100%)',
                backgroundColor: 'var(--background-color)',
            }}>
                <BossAreaManagement />
            </div>
        </div>
    );
}

export default AreaManagement;