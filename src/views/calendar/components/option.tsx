type Props = {
  isDisabled?: boolean;
  value: string;
};

export default function Option({
  children,
  isDisabled,
  value,
}: React.PropsWithChildren<Props>) {
  return (
    <option disabled={isDisabled ? true : false} value={value}>
      {children || value}
    </option>
  );
};
