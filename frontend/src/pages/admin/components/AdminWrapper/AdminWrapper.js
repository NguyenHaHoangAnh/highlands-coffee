function AdminWrapper({ children }) {
    return (
        <div className='w-full'>
            <div className='w-full' style={{
                padding: '30px',
                minHeight: 'calc(100vh - var(--admin-layout-header-height))',
                maxHeight: '100%',
                backgroundColor: 'var(--background-color)',
            }}>
                {children}
            </div>
        </div>
    );
}

export default AdminWrapper;