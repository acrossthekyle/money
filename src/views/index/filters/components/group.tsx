type Props = {
  label: string;
};

export default function Group({ children, label }: React.PropsWithChildren<Props>) {
  return (
    <optgroup label={label}>
      {children}
    </optgroup>
  );
};
