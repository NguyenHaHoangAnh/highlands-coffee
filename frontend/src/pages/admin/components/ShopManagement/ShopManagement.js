import BossShopManagement from '~/pages/admin/Boss/ShopManagement';

function ShopManagement() {
    return (
        <div className='w-full'>
            <div className='w-full' style={{
                padding: '30px',
                height: 'max(calc(100vh - var(--admin-layout-header-height)), 100%)',
                backgroundColor: 'var(--background-color)',
            }}>
                <BossShopManagement />
            </div>
        </div>
    );
}

export default ShopManagement;