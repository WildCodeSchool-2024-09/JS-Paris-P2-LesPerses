import { useCallback, useEffect, useState } from "react";
import type { Dispatch } from "react";

import CategorySelector from "./CategorySelector";
import DifficultySelector from "./DifficultySelector";

export interface Question {
	_id: string;
	question: string;
	answer: string;
	badAnswers: string[];
	category: string;
	difficulty: "facile" | "normal" | "difficile";
	quiz: string;
}

const Themedif = ({
	setData,
	data,
}: {
	setData: Dispatch<Question[] | null>;
	data: Question[] | null;
}) => {
	const [category, setCategory] = useState<string | null>(null);
	const [difficulty, setDifficulty] = useState<string | null>(null);
	const [step, setStep] = useState(1);

	// Stabiliser buildApiUrl avec useCallback
	const buildApiUrl = useCallback(() => {
		let url = import.meta.env.VITE_API_URL;

		if (category) {
			url += `?category=${category}`;
		}

		if (difficulty) {
			url += category
				? `&difficulty=${difficulty}`
				: `?difficulty=${difficulty}`;
		}

		// console.log("API URL générée :", url);
		return url;
	}, [category, difficulty]); // Ajout des dépendances

	useEffect(() => {
		const fetchData = async () => {
			const apiUrl = buildApiUrl(); // Appelle la fonction stabilisée

			try {
				const response = await fetch(apiUrl);
				if (!response.ok) {
					throw new Error(`Erreur HTTP: ${response.status}`);
				}

				const result = await response.json();
				// console.log("Données reçues :", result);

				if (
					result &&
					Array.isArray(result.quizzes) &&
					result.quizzes.length > 0
				) {
					setData(result.quizzes);
				}
			} catch (error) {
				console.error(`Erreur : ${error}`);
			}
		};

		fetchData();
	}, [buildApiUrl, setData]); // Ajouter buildApiUrl comme dépendance stabilisée

	return (
		<div>
			{step === 1 && (
				<CategorySelector
					onSelectCategory={(selectedCategory) => {
						// console.log("Catégorie sélectionnée :", selectedCategory);
						setCategory(selectedCategory);
						setStep(2);
					}}
				/>
			)}
			{step === 2 && (
				<DifficultySelector
					onSelectDifficulty={(selectedDifficulty) => {
						// console.log("Difficulté sélectionnée :", selectedDifficulty);
						setDifficulty(selectedDifficulty);
						setStep(3);
					}}
					goBack={() => setStep(1)}
				/>
			)}
		</div>
	);
};

export default Themedif;
