import { ActiveLink } from '../ActiveLink';
import { SignInButton } from '../SignInButton';
import styles from './styles.module.scss';

export function Header() {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                {/* <img src="/images/logo.svg" alt="" /> */}
                <ActiveLink href={'/'}><a><h1>Post News</h1></a></ActiveLink>
                <nav>
                    <ActiveLink activeClassName={styles.active} href={'/'}>
                        <a className={styles.active}>Home</a>
                    </ActiveLink>  
                    <ActiveLink activeClassName={styles.active} href={'/posts'}>
                        <a>Posts</a>
                    </ActiveLink>
                </nav>
                <SignInButton/>
            </div>
        </header>
    );
} 