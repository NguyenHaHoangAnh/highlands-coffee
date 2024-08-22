import Header from './components/Header';
import Footer from './components/Footer';
import Cart from '~/components/Cart/Cart';
import { CartProvider } from '~/components/CartProvider';

function CustomerLayout({ children }) {
    return (
        <div>
            <Header />
            <CartProvider>
                <main>
                    {children}
                    <Cart />
                </main>
            </CartProvider>
            <Footer />
        </div>
    );
}

export default CustomerLayout;