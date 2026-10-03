import Image from 'next/image'
import Link from 'next/link'

const categories = [
  { id: 1, label: 'Luxury Pret', img: '/images/category/1.webp', span: 'col-span-1 md:col-span-3', height: "h-64 sm:h-80 md:h-96", to: "/category/luxury-pret" },
  { id: 2, label: 'Luxury Formals', img: '/images/category/2.webp', span: 'col-span-1 sm:col-span-2', height: "h-64 sm:h-80 md:h-96", to: "/category/luxury-formals" },
  { id: 3, label: 'Culture', img: '/images/category/3.webp', span: 'col-span-1', height: "h-64 sm:h-80 md:h-96", to: "/category/culture" },
  { id: 4, label: 'Jewelry', img: '/images/category/4.webp', span: 'col-span-1', height: "h-64 sm:h-80 md:h-96", to: "/category/jewelry" },
  { id: 5, label: 'Accessories', img: '/images/category/5.webp', span: 'col-span-1', height: "h-64 sm:h-80 md:h-96", to: "/category/accessories" },
]

const CategoryCard = ({ cat }) => (
  <Link
  href={cat.to}
    className={`relative w-full group overflow-hidden ${cat.span} ${cat.height} rounded-2xl`}
  >
    <Image
      src={cat.img}
      fill
      alt={cat.label}
      className='object-cover group-hover:scale-105 transition-transform duration-500'
      sizes='(max-width: 768px) 100vw, 33vw'
    />
    <span className='absolute bottom-4 left-[40%] text-white text-2xl font-medium drop-shadow'>
      {cat.label}
    </span>
  </Link>
)

const CategoryGrid = () => {
  return (
    <div className='w-full px-5 sm:px-12 mx-auto flex flex-col gap-6 '>
      <div className='grid md:grid-cols-5 gap-4 w-full'>
        {categories.slice(0, 2).map((cat) => (
          <CategoryCard key={cat.id} cat={cat} />
        ))}
      </div>

      <div className='grid md:grid-cols-3 gap-4 w-full'>
        {categories.slice(2).map((cat) => (
          <CategoryCard key={cat.id} cat={cat} />
        ))}
      </div>
    </div>
  )
}

export default CategoryGrid