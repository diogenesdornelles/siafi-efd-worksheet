import { Footer } from 'flowbite-react';

/**
 * Component JSX that render Footer Homepage
 * @returns {JSX.Element} - return Footer Homepage
 */

function TheFooter() {
  return (
    <Footer
      container
      fluid={'true'}
      rounded={'false'}
      style={{ borderRadius: '0px' }}
    >
      <div className="flex gap-x-2 items-center">
        <Footer.Copyright
          by="diogenesdornelles"
          href="https://github.com/diogenesdornelles/media-log-v3.git"
          year={2023}
        />
      </div>
      <Footer.LinkGroup>
        <Footer.Link href="#">Contato</Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  );
}

export default TheFooter;
