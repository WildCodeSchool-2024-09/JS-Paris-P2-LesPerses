interface Props {
	onSelectDifficulty: (difficulty: string) => void;
	goBack: () => void;
}

const DifficultySelector: React.FC<Props> = ({
	onSelectDifficulty,
	goBack,
}) => {
	const difficulties = [
		{ value: "facile", img: "1etoile-sans-fond.png", alt: "Facile" },
		{ value: "normal", img: "2etoiles-sans-fond.png", alt: "Normal" },
		{ value: "difficile", img: "3etoiles-sans-fond.png", alt: "Difficile" },
	];

	return (
		<div className="difficulty">
			<h1>Choisir une difficulté</h1>
			<div className="choice">
				{difficulties.map((difficulty) => (
					<button
						key={difficulty.value}
						type="button"
						onClick={() => onSelectDifficulty(difficulty.value)}
					>
						<img src={`src/images/${difficulty.img}`} alt={difficulty.alt} />
					</button>
				))}
			</div>
			<div className="back">
				<button type="button" onClick={goBack}>
					<img src="src/images/Back-sans-fond.png" alt="Retour" />
				</button>
			</div>
		</div>
	);
};

export default DifficultySelector;
