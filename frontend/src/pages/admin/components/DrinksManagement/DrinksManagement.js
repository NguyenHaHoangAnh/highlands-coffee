import BossDrinksManagement from '~/pages/admin/Boss/DrinksManagement';

function FreezeManagement() {
    return (
        <div className='w-full'>
            <div className='w-full' style={{
                padding: '30px',
                height: 'max(calc(100vh - var(--admin-layout-header-height)), 100%)',
                backgroundColor: 'var(--background-color)',
            }}>
                <BossDrinksManagement />
            </div>
        </div>
    );
}

export default FreezeManagement;