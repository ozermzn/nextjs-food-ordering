const Title = ({ children, className }) => {
  const classes = "font-dancing";
  return (
    <div className={`text-[2rem] font-dancing font-bold ${className}`}>
      {children}
    </div>
  );
};

export default Title;
