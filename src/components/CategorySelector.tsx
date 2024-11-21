interface Props {
	onSelectCategory: (category: string) => void;
}

const CategorySelector: React.FC<Props> = ({ onSelectCategory }) => {
	const categories = [
		{
			value: "art_litterature",
			label: "Art et Littérature",
			img: "Logo-littérature-sans-fond.png",
		},
		{ value: "tv_cinema", label: "Cinéma", img: "Logo-cinéma-sans-fond.png" },
		{ value: "sport", label: "Sport", img: "Logo-sport-ballon-sans-fond.png" },
		{
			value: "jeux_videos",
			label: "Jeux Vidéos",
			img: "logo-jeux_vidéos-sans-fond.png",
		},
		{ value: "musique", label: "Musique", img: "logo-musique-sans-fond.png" },
		{
			value: "culture_generale",
			label: "Culture Générale",
			img: "logo-cultureG-sans-fond.png",
		},
	];

	return (
		<div>
			<h1>Choisir une catégorie</h1>
			<section className="category-container">
				{categories.map((category) => (
					<button
						key={category.value}
						type="button"
						onClick={() => onSelectCategory(category.value)}
						className="category-button"
					>
						{category.label}
						<img
							src={`src/images/${category.img}`}
							alt={category.label}
							className="category-img-size"
						/>
					</button>
				))}
			</section>
		</div>
	);
};

export default CategorySelector;
