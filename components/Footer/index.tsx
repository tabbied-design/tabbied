import SamePageLink from 'components/SamePageLink';
import { Container, Row, Col } from 'components/layout';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footerSection}>
      <Container>
        <Row>
          <Col lg={{ span: 3, offset: 1 }} md={{ span: 4 }}>
            <h5>Tabbied</h5>

            <p>Copyright {new Date().getFullYear()}.</p>
          </Col>

          <Col lg={{ span: 4 }} md={{ span: 5 }}>
            <h5>About Us</h5>

            <p>
              Tabbied lets you easily create timeless and beautifully generated
              patterns to use for wall art, websites, print materials and more.
            </p>
            <p>
              This free tool was built by{' '}
              <a href="https://www.syunghong.com/">Sy Hong</a> and{' '}
              <a href="https://www.behance.net/yejoopark">Ye Joo Park</a>.
            </p>
          </Col>

          <Col lg={{ span: 3, offset: 1 }} md={{ span: 3 }}>
            <h5>Links</h5>

            <ul className={styles.linkList}>
              <li>
                <SamePageLink href="/privacy-policy" prefetch={false}>
                  Privacy Policy
                </SamePageLink>
              </li>
              <li>
                <SamePageLink href="/terms-of-service" prefetch={false}>
                  Terms of Service
                </SamePageLink>
              </li>
              <li>
                <SamePageLink href="/docs" prefetch={false}>
                  Developers
                </SamePageLink>
              </li>
              <li>
                <a href="https://github.com/tabbied-design/tabbied/">
                  GitHub
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
