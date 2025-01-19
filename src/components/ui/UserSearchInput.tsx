interface SearchProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

const UserSearch = ({
  placeholder = 'Search by user...',
  value,
  onChange,
}: SearchProps) => {
  return (
    <div className="relative">
      {/* Search icon */}
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <img
          src="/assets/search-icon.svg"
          alt="Search Icon"
          width="18"
          height="16"
        />
      </div>

      {/* Search input field */}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-primary text-textSecondary placeholder-textSecondary rounded-md pl-9 pr-4 py-2 focus:outline-none "
      />
    </div>
  );
};

export default UserSearch;
