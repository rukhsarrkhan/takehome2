import React from 'react';

// Sorting the patients, to show patient with most time elapsed first, mostly so the patients cases are reviewed in the 48 hour window
export const useSortedPatients = (patients) => {
    return React.useMemo(() =>
        [...patients].sort((a, b) => b.timeElapsed - a.timeElapsed),
        [patients]
    );
};

// Grouping the patients based on Category for the filtered data
export const useGroupedPatients = (patients) => {
    return React.useMemo(() =>
        patients.reduce((acc, patient) => {
            if (!acc[patient.condition]) {
                acc[patient.condition] = [];
            }
            acc[patient.condition].push(patient);
            return acc;
        }, {}),
        [patients]
    );
};

// Calculating age
export const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};

// Enhancement - identifying risk factors based on allergies, age and condition 
// Patient having an allergy is higher risk than not having one, so highlighting it in the screen
// Patient having and age > 50 are at higher risk 
// Patient having a condition of Melanoma, Psoriasis are at a higher risk then acne and eczema as it could be fatal to life.
export const identifyRiskFactors = (patient) => {
    const risks = [];
    if (patient.allergies !== "None") risks.push("Allergies");
    if (patient.condition === "Melanoma" || patient.condition === "Psoriasis") risks.push("High-risk");
    if (calculateAge(patient.dateOfBirth) > 50) risks.push("Age risk");
    return risks;
};

// Generating summary for review case modal
export const generateSummary = (patient) => {
    const age = calculateAge(patient.dateOfBirth);
    return [
        { label: "Name", value: `${patient.firstName} ${patient.lastName}` },
        { label: "Age", value: `${age} years old` },
        { label: "Sex", value: patient.sex },
        { label: "Condition", value: patient.condition },
        { label: "History", value: patient.history },
        { label: "Current medications", value: patient.medications },
        { label: "Allergies", value: patient.allergies }
    ];
};