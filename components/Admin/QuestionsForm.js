import React, { useEffect, useState } from 'react';
import styles from '@/styles/RightSide.module.css'

function Loader() {
  return <div className={styles.loader}>Loading questions...</div>;
}

function JumbledWords({ index, updateData, predataJW }) {
  const [choices, setChoices] = useState(() => {
    return predataJW[index]?.choices?.length ? predataJW[index].choices : ["", ""];
  });

  useEffect(() => {
    if (predataJW[index]?.choices) {
      setChoices(predataJW[index].choices);
    }
  }, [predataJW, index]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateData(index, { [name]: value, choices });
  };

  const handleChoiceChange = (choiceIndex, value) => {
    const updatedChoices = [...choices];
    updatedChoices[choiceIndex] = value;
    setChoices(updatedChoices);
    updateData(index, { choices: updatedChoices });
  };

  const addChoice = () => {
    const updatedChoices = [...choices, ""];
    setChoices(updatedChoices);
    updateData(index, { choices: updatedChoices });
  };

  const removeChoice = (choiceIndex) => {
    const updatedChoices = choices.filter((_, i) => i !== choiceIndex);
    setChoices(updatedChoices);
    updateData(index, { choices: updatedChoices });
  };

  return (
    <div className={styles.card}>
      <div className={styles.small}>Jumbled Words {index + 1}</div>
      <input
        name="question"
        className={styles.input}
        placeholder="Question"
        value={predataJW[index]?.question || ""}
        onChange={handleInputChange}
      />
      <div className={styles.choices}>
        {choices.map((choice, i) => (
          <div key={i} className={styles.choiceRowflex}>
            <input
              className={styles.choiceInput}
              placeholder={`Word ${i + 1}`}
              value={choice}
              onChange={(e) => handleChoiceChange(i, e.target.value)}
            />
            <button className={styles.removeBtn} onClick={() => removeChoice(i)}>❌</button>
          </div>
        ))}
      </div>
      <button className={styles.addButton} onClick={addChoice}>+ Add Word</button>
    </div>
  );
}

function MCQ({ index, updateData, predataMCQ }) {
  const [choices, setChoices] = useState(() => {
    return predataMCQ[index]?.choices?.length ? predataMCQ[index].choices : ['', '', '', ''];
  });

  useEffect(() => {
    if (predataMCQ[index]?.choices) {
      setChoices(predataMCQ[index].choices);
    }
  }, [predataMCQ, index]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateData(index, { [name]: value, choices });
  };

  const handleChoiceChange = (choiceIndex, value) => {
    const updatedChoices = [...choices];
    updatedChoices[choiceIndex] = value;
    setChoices(updatedChoices);
    updateData(index, { choices: updatedChoices });
  };

  const addChoice = () => {
    const updatedChoices = [...choices, ''];
    setChoices(updatedChoices);
    updateData(index, { choices: updatedChoices });
  };

  return (
    <div className={styles.card}>
      <div className={styles.small}>MCQ {index + 1}</div>
      <input
        name="question"
        className={styles.input}
        placeholder="Question"
        value={predataMCQ[index]?.question || ''}
        onChange={handleInputChange}
      />
      <div className={styles.choices}>
        {choices.map((choice, i) => (
          <input
            key={i}
            className={styles.choiceInput}
            placeholder={`Choice ${i + 1}`}
            value={choice}
            onChange={(e) => handleChoiceChange(i, e.target.value)}
          />
        ))}
      </div>
      <input
        name="correctAnswer"
        className={styles.input}
        placeholder="Correct Answer"
        value={predataMCQ[index]?.correctAnswer || ''}
        onChange={handleInputChange}
      />
    </div>
  );
}
function AMCQ({ index, updateData, predataMCQ }) {
  const [choices, setChoices] = useState(() => {
    return predataMCQ[index]?.choices?.length ? predataMCQ[index].choices : ['', '', '', ''];
  });

  useEffect(() => {
    if (predataMCQ[index]?.choices) {
      setChoices(predataMCQ[index].choices);
    }
  }, [predataMCQ, index]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateData(index, { [name]: value, choices });
  };

  const handleChoiceChange = (choiceIndex, value) => {
    const updatedChoices = [...choices];
    updatedChoices[choiceIndex] = value;
    setChoices(updatedChoices);
    updateData(index, { choices: updatedChoices });
  };

  // const addChoice = () => {
  //   const updatedChoices = [...choices, ''];
  //   setChoices(updatedChoices);
  //   updateData(index, { choices: updatedChoices });
  // };

  return (
    <div className={styles.card}>
      <div className={styles.small}>MCQ {index + 1}</div>
      <input
        name="question"
        className={styles.input}
        placeholder="Question"
        value={predataMCQ[index]?.question || ''}
        onChange={handleInputChange}
      />
      <div className={styles.choices}>
        {choices.map((choice, i) => (
          <input
            key={i}
            className={styles.choiceInput}
            placeholder={`Choice ${i + 1}`}
            value={choice}
            onChange={(e) => handleChoiceChange(i, e.target.value)}
          />
        ))}
      </div>
      <input
        name="correctAnswer"
        className={styles.input}
        placeholder="Correct Answer"
        value={predataMCQ[index]?.correctAnswer || ''}
        onChange={handleInputChange}
      />
    </div>
  );
}


function FillInTheBlanks({ index, updateData, predataFB }) {
  const [choices, setChoices] = useState(() => {
    return predataFB[index]?.choices?.length ? predataFB[index].choices : [''];
  });

  useEffect(() => {
    if (predataFB[index]?.choices) {
      setChoices(predataFB[index].choices);
    }
  }, [predataFB, index]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateData(index, { [name]: value, choices });
  };

  const handleChoiceChange = (choiceIndex, value) => {
    const updatedChoices = [...choices];
    updatedChoices[choiceIndex] = value;
    setChoices(updatedChoices);
    updateData(index, { choices: updatedChoices });
  };

  return (
    <div className={styles.card}>
      <div className={styles.small}>Fill in the Blanks {index + 1}</div>
      <input
        name="question"
        className={styles.input}
        placeholder="Question"
        value={predataFB[index]?.question || ''}
        onChange={handleInputChange}
      />
      <div className={styles.choices}>
        {choices.map((choice, i) => (
          <input
            key={i}
            className={styles.choiceInput}
            placeholder={`Answer ${i + 1}`}
            value={choice}
            onChange={(e) => handleChoiceChange(i, e.target.value)}
          />
        ))}
      </div>
    </div>
  );
}

function Match({ index, updateData, predataMTF }) {
  const [pairs, setPairs] = useState(() => {
    if (predataMTF[index]?.pairs?.length) {
      return predataMTF[index].pairs;
    }
    return Array(5).fill({ left: { word: "", rightId: "" }, right: { word: "", rightId: "" } });
  });

  useEffect(() => {
    if (predataMTF[index]?.pairs) {
      setPairs(predataMTF[index].pairs);
    }
  }, [predataMTF, index]);

  const handleInputChange = (rowIndex, field, side, value) => {
    const updatedPairs = [...pairs];
    updatedPairs[rowIndex][side][field] = value;
    setPairs(updatedPairs);
    updateData(index, { pairs: updatedPairs });
  };

  return (
    <div className={styles.card}>
      <div className={styles.small}>Match {index + 1}</div>
      {pairs.map((pair, rowIndex) => (
        <div key={rowIndex} className={styles.matchRow}>
          <input
            className={styles.input}
            placeholder="Left Word"
            value={pair.left.word}
            onChange={(e) => handleInputChange(rowIndex, "word", "left", e.target.value)}
          />
          <input
            className={styles.input}
            placeholder="Left ID"
            value={pair.left.rightId}
            onChange={(e) => handleInputChange(rowIndex, "rightId", "left", e.target.value)}
          />
          <input
            className={styles.input}
            placeholder="Right Word"
            value={pair.right.word}
            onChange={(e) => handleInputChange(rowIndex, "word", "right", e.target.value)}
          />
          <input
            className={styles.input}
            placeholder="Right ID"
            value={pair.right.rightId}
            onChange={(e) => handleInputChange(rowIndex, "rightId", "right", e.target.value)}
          />
        </div>
      ))}
    </div>
  );
}


export default function QuestionsForm({PformData, PsetFormData, section}) {
  const [formData, setFormData] = useState({ Amcqs: [], mcqs: [], blanks: [], matches: [], jumbledWords: [] });
  const [loading, setLoading] = useState(true);
  const [componentsCount, setComponentsCount] = useState({ 
    Amcqs: section !== "Exercises" && section !== "PracticeTest" ? 10 : 0 ,
    mcqs: section === "Exercises" ? 20 : section === "PracticeTest" ? 20 : section === "Reading" || section === "Listening" ? 0 : 10, 
    blanks: section === "Exercises" ? 20 : section === "PracticeTest" ? 20 : section === "Reading" || section === "Listening" ? 0 : 10, 
    matches: section === "Exercises" ? 2 : section === "PracticeTest" ? 8 : section === "Reading" || section === "Listening" ? 0 : 1 ,
    jumbledWords: section === "PracticeTest" ? 20 : 0});
    const predataMCQ = PformData.questions.filter((data) => data?.type === "MCQs");
    const predataFB = PformData.questions.filter((data) => data?.type === "FillInTheBlanks");
    const predataMTF = PformData.questions.filter((data) => data?.type === "MatchTheFollowing");
    const predataJW = PformData.questions.filter((data) => data?.type === "JumbledWords");

  useEffect(() => {
    setFormData({
      Amcqs: PformData.questions || [],
      mcqs: predataMCQ || [],
      blanks: predataFB || [],
      matches: predataMTF || [],
      jumbledWords: predataJW || []
   });

  }, [PformData]); // Recalculate whenever PformData changes

  useEffect(()=>{
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  }, [])

  if (loading) {
    return <Loader />;
  }

  const updateMCQData = (index, data) => {
    const newMCQ = [...formData.mcqs];
    newMCQ[index] = { ...newMCQ[index], ...data };
    setFormData((prev) => ({ ...prev, mcqs: newMCQ }));
    PsetFormData((prev) => ({
      ...prev,
      questions: [
        ...prev.questions.filter((q) => q?.type !== "MCQs"),
        ...newMCQ.map((mcq) => ({ type: "MCQs", ...mcq })),
      ],
    }));
  };

  const updateJumbledWordsData = (index, data) => {
    const newJumbledWords = [...formData.jumbledWords];
    newJumbledWords[index] = { ...newJumbledWords[index], ...data };
    setFormData((prev) => ({ ...prev, jumbledWords: newJumbledWords }));
    PsetFormData((prev) => ({
      ...prev,
      questions: [
        ...prev.questions.filter((q) => q?.type !== "JumbledWords"),
        ...newJumbledWords.map((jw) => ({ type: "JumbledWords", ...jw })),
      ],
    }));
  };

  const updateAMCQData = (index, data) => {
    console.log(data)
    const newAMCQ = [...formData.Amcqs];
    newAMCQ[index] = { ...newAMCQ[index], ...data };
    setFormData((prev) => ({ ...prev, mcqs: newAMCQ }));
    PsetFormData((prev) => ({
      ...prev,
      questions: [
        ...newAMCQ.map((mcq) => ({...mcq })),
      ],
    }));
  };

  const updateBlankData = (index, data) => {
    const newBlanks = [...formData.blanks];
    newBlanks[index] = { ...newBlanks[index], ...data };
    setFormData((prev) => ({ ...prev, blanks: newBlanks }));
    PsetFormData((prev) => ({
      ...prev,
      questions: [
        ...prev.questions.filter((q) => q?.type !== "FillInTheBlanks"),
        ...newBlanks.map((blank) => ({ type: "FillInTheBlanks", ...blank })),
      ],
    }));
  };

  const updateMatchData = (index, data) => {
    const newMatches = [...formData.matches];
    newMatches[index] = { ...newMatches[index], ...data };
    setFormData((prev) => ({ ...prev, matches: newMatches }));
    PsetFormData((prev) => ({
      ...prev,
      questions: [
        ...prev.questions.filter((q) => q?.type !== "MatchTheFollowing"),
        ...newMatches.map((match) => ({ type: "MatchTheFollowing", ...match })),
      ],
    }));
  };

  // const addMoreComponents = () => {
  //   setComponentsCount((prev) => ({
  //     mcqs: prev.mcqs + 10,
  //     blanks: prev.blanks + 10,
  //     matches: prev.matches + 1,
  //   }));
  // };

  return (
    <div>
      <div className={styles.flex5}>
      {[...Array(componentsCount.Amcqs)].map((_, i) => (
        <AMCQ className={styles.flexitms} key={`mcq-${i}`} predataMCQ={PformData.questions} index={i} updateData={updateAMCQData} />
      ))}
      </div>
      <div className={styles.flex5}>
      {[...Array(componentsCount.mcqs)].map((_, i) => (
        <MCQ className={styles.flexitms} key={`mcq-${i}`} predataMCQ={predataMCQ} index={i} updateData={updateMCQData} />
      ))}
      </div>
      <div className={styles.flex5}>
      {[...Array(componentsCount.blanks)].map((_, i) => (
        <FillInTheBlanks key={`blank-${i}`} index={i} predataFB={predataFB} updateData={updateBlankData} />
      ))}
      </div>
      <div className={styles.flex5}>
        {[...Array(componentsCount.jumbledWords)].map((_, i) => (
          <JumbledWords key={`jw-${i}`} predataJW={predataJW} index={i} updateData={updateJumbledWordsData} />
        ))}
      </div>
      <div className={styles.flex5}>
      {[...Array(componentsCount.matches)].map((_, i) => (
        <Match key={`match-${i}`} index={i} predataMTF={predataMTF} updateData={updateMatchData} />
      ))}
      </div>
      {/* <button className={styles.submitButton} onClick={addMoreComponents}>Add More Components</button> */}
    </div>
  );
}