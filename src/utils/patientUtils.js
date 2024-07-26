import React from 'react';

export const useSortedPatients = (patients) => {
    return React.useMemo(() =>
        [...patients].sort((a, b) => b.timeElapsed - a.timeElapsed),
        [patients]
    );
};

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

export const identifyRiskFactors = (patient) => {
    const risks = [];
    if (patient.allergies !== "None") risks.push("Allergies");
    if (patient.condition === "Melanoma" || patient.condition === "Psoriasis") risks.push("High-risk");
    if (calculateAge(patient.dateOfBirth) > 60) risks.push("Age risk");
    return risks;
};

export const generateSummary = (patient) => {
    const age = calculateAge(patient.dateOfBirth);
    return [
        { label: "Name", value: `${patient.firstName} ${patient.lastName}` },
        { label: "Age", value: `${age} years old` },
        { label: "Condition", value: patient.condition },
        { label: "History", value: patient.history },
        { label: "Current medications", value: patient.medications },
        { label: "Allergies", value: patient.allergies }
    ];
};