import {
  Footer,
  FooterBrand,
  FooterCopyright,
  FooterDivider,
  FooterLink,
  FooterLinkGroup,
} from "flowbite-react";

function PageFooter() {
  return (
    <Footer container>
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <FooterBrand
            href="/"
            src="/emplogo.png"
            alt="Every Mini Painted Logo"
            name="Every Mini Painted"
          />
          <FooterLinkGroup>
            <FooterLink href="/about">About</FooterLink>
            {/* <FooterLink href="/privacy">Privacy Policy</FooterLink> */}
            <FooterLink href="/contact">Contact</FooterLink>
          </FooterLinkGroup>
        </div>
        <FooterDivider />
        <FooterCopyright by="Evan Parker" year={2025} />
      </div>
    </Footer>
  );
}

export default PageFooter;
