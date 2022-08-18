import Link from 'next/link';
import {FiShoppingBag} from 'react-icons/fi';
import { NavStyles, NavItems } from '../styles/NavStyles.js';

export default function Nav(){
    return (
    <NavStyles>
        <Link href={'/'}>Styled.</Link>
        <NavItems>
            <div>
                <FiShoppingBag/>
                <h3>Cart</h3>
            </div>
        </NavItems>
    </NavStyles>
);
}