const Input = ({
  children,
  touched,
  errorMessage,
  className,
  type,
  placeholder,
  ...rest
}) => {
  return (
    <div className="w-full">
      <label className="relative block w-full">
        <input
          {...rest}
          type={type}
          maxLength={rest.max}
          placeholder={placeholder}
          className={`w-full h-14 border  border-primary outline-none peer px-4 pt-2 rounded-md ${
            errorMessage && "border-danger"
          } ${className}`}
          required
        />
        <span className="absolute top-0 left-0 px-4 text-sm flex items-center h-full peer-focus:h-7 peer-focus:text-xs peer-valid:h-7 peer-valid:text-xs transition-all text-slate-500 font-semibold">
          {children}
        </span>
      </label>
    </div>
  );
};

export default Input;
