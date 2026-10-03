const SectionHeader = ({ title, subtitle }) => (
  <div className='flex flex-col ml-12 mt-12 mb-5'>
    <h2 className='text-3xl md:text-4xl font-semibold tracking-wide'>{title}</h2>
    {subtitle && (
      <p className='text-gray-500 mt-2 text-sm md:text-base'>{subtitle}</p>
    )}
  </div>
)

export default SectionHeader