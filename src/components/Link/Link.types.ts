export interface LinkProps {
  linkTo: string;
  text: string;
}

export interface ClassLinkProps extends LinkProps {
  events: {
    click: (e: MouseEvent) => void;
  };
}
