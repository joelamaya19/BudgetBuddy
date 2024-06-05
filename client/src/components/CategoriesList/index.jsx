

const CategoryList = ({
    category,
}) => {
    if (!category.length) {
        return <h3>No categories created.</h3>;
    }

    // How its going to look in the front end?
    return (
        <div>
            {category &&
                category.map((category) => (
                    <div key={category._id} value="" className=""> 
                        <h4 className="">
                            <div>
                                <p>{category.name}</p>
                            </div>
                        </h4>
                    </div> 
                ))}
        </div>
    );
};

export default CategoryList;