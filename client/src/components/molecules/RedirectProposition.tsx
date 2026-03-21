import { Link } from 'react-router-dom';

type RedirectPropositionProps = {
  text: string;
  link: string;
  linkText: string;
};

function RedirectProposition({ text, link, linkText }: RedirectPropositionProps) {
  return (
    <p className="text-center mt-3">
      {text} <Link to={link}>{linkText}</Link>
    </p>
  );
}

export default RedirectProposition;
