import Header from './components/Header';
import { HeaderProvider } from './components/Header/HeaderContext';
import Footer from './components/Footer';

function CustomerLayout({ children }) {
    return (
        <div>
            <HeaderProvider>
                <Header />
                <main>{children}</main>
                <Footer />
            </HeaderProvider>
        </div>
    );
}

export default CustomerLayout;