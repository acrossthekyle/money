type Props = {
  name: string;
  value: string;
  onChange: () => void;
};

export default function Option({ children, value }: React.PropsWithChildren<Props>) {
  return (
    <option value={value}>
      {children || value}
    </option>
  );
};
