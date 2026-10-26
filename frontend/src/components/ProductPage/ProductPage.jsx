import { useEffect } from 'react';
import { useState } from 'react';
import { getCategories } from '../../api/api';
import { productsPageStyles as s } from '../../assets/dummyStyles';
import { Link } from 'react-router-dom';

const ProductsPage = () => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const fetchcategories = async () => {
            try {
                const {data} = await getCategories()
                setCategories(data.categories)
            } catch (error) {
                console.log(error)
            }
        }
        fetchcategories()
    }, [])
  return (
    <section className={s.section} id={"products"}>
        <div className="pointer-events-none absolute inset-0" style={s.gradientBackground}/>

        <div className={s.grid}>
            {categories.map((category, index) => (
                <Link key={category._id} to={`/product/${encodeURIComponent(category.categoryName)}`} className={s.categoryLink} style={{
                    animation: "fadeUp 0.6s ease both",
                    animationDelay: `${index * 60}ms`,
                }}>
                    <img src={category.image?.url} className={s.categoryImage} alt="" />
                    <h3 className={s.categoryName}>{category.categoryName}</h3>
                </Link>
            ))}
        </div>
    </section>
  )
}

export default ProductsPage