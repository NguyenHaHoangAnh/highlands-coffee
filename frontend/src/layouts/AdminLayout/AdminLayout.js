import Header from './components/Header';
import Sidebar from './components/Sidebar';

function AdminLayout({ children }) {
    return (
        <div className='w-full'>
            <div className='w-full'>
                <Header />
                <div className='flex' style={{
                    paddingTop: 'var(--admin-layout-header-height)',
                }}>
                    <Sidebar />
                    <main className='w-full' style={{
                        paddingLeft: 'var(--admin-layout-sidebar-width)',
                    }}>
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default AdminLayout;