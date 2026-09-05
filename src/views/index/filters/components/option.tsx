type Props = {
  value: string;
};

export default function Option({ children, value }: React.PropsWithChildren<Props>) {
  return (
    <option value={value}>
      {children || value}
    </option>
  );
};
