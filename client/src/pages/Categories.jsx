import CategoryForm from '../components/CategoriesForm/index';
import { useQuery } from '@apollo/client';
import { QUERY_CATEGORIES } from '../utils/queries';
import Auth from '../utils/auth'
import CategoryList from '../components/CategoriesList';

const Categories = () => {
    const token = Auth.getProfile();
    
    const {loading, data } = useQuery(QUERY_CATEGORIES, {
        variables: {name: token.data.name}
    });

    
    const category = data?.categories || [];
    console.log(data, 'data array');
    console.log(category, 'category array');

    return (
        <main>
            <CategoryForm />
            <div className="col-12 col-md-8 mb-3">
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <CategoryList
                            category={category}
                            // more props?
                        />
                    )}
                </div>
        </main>
    );
};

export default Categories;