/**
 * Course: INFO-5143 – JavaScript 4
 * Professor: Marcelo Hespanhol
 * Project: Major Project
 * Description: Form component - Add new pet registration with validation.
 * Handles pet data collection, form validation, and Firebase Firestore submission.
 */

import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { useLanguage } from '../../context/LanguageContext';

// Reference to the 'pets' collection in Firestore
const petsCollectionRef = collection(db, 'pets');

// Create default care tasks for new pet profiles
const buildDefaultCareTasks = () => ([
    { id: crypto.randomUUID(), label: 'Feed', done: false },
    { id: crypto.randomUUID(), label: 'Walk', done: false },
    { id: crypto.randomUUID(), label: 'Vet appointment', done: false },
    { id: crypto.randomUUID(), label: 'Bath', done: false },
]);

// Regex pattern for basic email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Format phone number based on language (PT or EN format)
const formatPhone = (rawValue, language) => {
    const isPortuguese = language === 'pt';
    const digits = rawValue.replace(/\D/g, '').slice(0, isPortuguese ? 11 : 10);

    if (isPortuguese) {
        if (digits.length <= 2) {
            return digits.length === 0 ? '' : `(${digits}`;
        }

        if (digits.length <= 6) {
            return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
        }

        if (digits.length <= 10) {
            return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
        }

        return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
    }

    if (digits.length <= 3) {
        return digits.length === 0 ? '' : `(${digits}`;
    }

    if (digits.length <= 6) {
        return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    }

    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
};

// Controlled form to create new pet profiles.
// Form component - controlled form for registering new pets
function Form({ onAddPet }) {
    // Hook for navigation after successful pet creation
    const navigate = useNavigate();
    const { language } = useLanguage();

    const t = language === 'pt'
        ? {
            kicker: 'Novo Cadastro',
            heading: 'Cadastrar novo pet',
            subtitle: 'Cuide melhor, um pet de cada vez.',
            requiredError: 'Informe nome do pet, nome do tutor, email, telefone e endereco.',
            emailError: 'Informe um email valido.',
            phoneError: 'Use um telefone valido no formato do Brasil: (00) 00000-0000.',
            phonePattern: '^\\(\\d{2}\\)\\s\\d{4,5}-\\d{4}$',
            phonePlaceholder: '(00) 00000-0000',
            phoneMaxLength: 15,
            vaccineRequired: 'Marque pelo menos uma vacina ou informe outra quando o pet estiver vacinado.',
            firebaseError: 'Nao foi possivel salvar o pet no Firebase:',
            savingInfo: 'Salvando perfil do pet...',
            petName: 'Nome do Pet',
            petType: 'Tipo de Pet',
            age: 'Idade (opcional)',
            ageNumber: 'Numero',
            ageUnit: 'Unidade',
            years: 'anos',
            months: 'meses',
            ownerName: 'Nome do Tutor',
            ownerEmail: 'Email do Tutor',
            ownerPhone: 'Telefone do Tutor',
            ownerAddress: 'Endereco do Tutor',
            ownerAddressPlaceholder: 'Rua, numero, cidade, provincia',
            ownerPhonePlaceholder: '(000) 000-0000',
            vaccinated: 'Vacinado',
            vaccineName: 'Qual vacina?',
            vaccinePlaceholder: 'ex.: V10, Antirrabica',
            vaccinePick: 'Selecione uma ou mais vacinas:',
            vaccineOther: 'Outra vacina (opcional)',
            saving: 'Salvando...',
            submit: 'Adicionar Pet',
            dog: 'Cachorro',
            cat: 'Gato',
            other: 'Outro',
            otherTypeRequired: 'Informe qual e o tipo de pet quando selecionar Outro.',
            otherTypeLabel: 'Qual tipo de pet?',
            otherTypePlaceholder: 'ex.: Coelho, Hamster, Passaro',
        }
        : {
            kicker: 'New Registration',
            heading: 'Register new pet',
            subtitle: 'Care smarter, one pet at a time.',
            requiredError: 'Enter pet name, owner name, owner email, owner phone, and owner address.',
            emailError: 'Enter a valid email address.',
            phoneError: 'Use a valid Canadian phone number format: (000) 000-0000.',
            phonePattern: '^\\(\\d{3}\\)\\s\\d{3}-\\d{4}$',
            phonePlaceholder: '(000) 000-0000',
            phoneMaxLength: 14,
            vaccineRequired: 'Select at least one vaccine or enter another vaccine when the pet is vaccinated.',
            firebaseError: 'Could not save the pet to Firebase:',
            savingInfo: 'Saving pet profile...',
            petName: 'Pet Name',
            petType: 'Pet Type',
            age: 'Age (optional)',
            ageNumber: 'Number',
            ageUnit: 'Unit',
            years: 'years',
            months: 'months',
            ownerName: 'Owner Name',
            ownerEmail: 'Owner Email',
            ownerPhone: 'Owner Phone',
            ownerAddress: 'Owner Address',
            ownerAddressPlaceholder: 'Street, number, city, province',
            ownerPhonePlaceholder: '(000) 000-0000',
            vaccinated: 'Vaccinated',
            vaccineName: 'Which vaccine?',
            vaccinePlaceholder: 'e.g. Rabies, DHPP',
            vaccinePick: 'Select one or more vaccines:',
            vaccineOther: 'Other vaccine (optional)',
            saving: 'Saving...',
            submit: 'Add Pet',
            dog: 'Dog',
            cat: 'Cat',
            other: 'Other',
            otherTypeRequired: 'Enter the pet type when Other is selected.',
            otherTypeLabel: 'Which pet type?',
            otherTypePlaceholder: 'e.g. Rabbit, Hamster, Bird',
        };
    const phoneRegex = new RegExp(t.phonePattern);

    const [ name, setName ] = useState('');
    const [ petType, setPetType ] = useState('Dog');
    const [ otherPetType, setOtherPetType ] = useState('');
    const [ ageNumber, setAgeNumber ] = useState('');
    const [ ageUnit, setAgeUnit ] = useState('years');
    const [ vaccinated, setVaccinated ] = useState(false);
    const [ selectedVaccines, setSelectedVaccines ] = useState([]);
    const [ vaccineName, setVaccineName ] = useState('');
    const [ ownerName, setOwnerName ] = useState('');
    const [ ownerEmail, setOwnerEmail ] = useState('');
    const [ ownerPhone, setOwnerPhone ] = useState('');
    const [ ownerAddress, setOwnerAddress ] = useState('');
    const [ errorMessage, setErrorMessage] = useState('');
    const [ isSaving, setIsSaving ] = useState(false);

    // Validate input, then submit the new pet.
    const handleFormSubmission = async (event) => {
        event.preventDefault();
        setErrorMessage('');

        if (name.trim() === '' || ownerName.trim() === '' || ownerEmail.trim() === '' || ownerPhone.trim() === '' || ownerAddress.trim() === '') {
            setErrorMessage(t.requiredError);
            return;
        }

        if (!emailRegex.test(ownerEmail.trim())) {
            setErrorMessage(t.emailError);
            return;
        }

        if (!phoneRegex.test(ownerPhone.trim())) {
            setErrorMessage(t.phoneError);
            return;
        }

        if (vaccinated && selectedVaccines.length === 0 && vaccineName.trim() === '') {
            setErrorMessage(t.vaccineRequired);
            return;
        }

        if (petType === 'Other' && otherPetType.trim() === '') {
            setErrorMessage(t.otherTypeRequired);
            return;
        }

        setIsSaving(true);

        try {
            const hasAge = ageNumber !== '';
            const normalizedAgeValue = hasAge ? Number(ageNumber) : null;
            const normalizedAgeUnit = hasAge ? ageUnit : '';
            const normalizedVaccines = [
                ...selectedVaccines,
                ...(vaccineName.trim() !== '' ? [vaccineName.trim()] : []),
            ];

            const petToSave = {
                name: name.trim(),
                type: petType === 'Other' ? otherPetType.trim() : petType,
                age: hasAge ? `${normalizedAgeValue} ${normalizedAgeUnit}` : '',
                ageValue: normalizedAgeValue,
                ageUnit: normalizedAgeUnit,
                vaccinated,
                vaccineName: vaccinated ? normalizedVaccines.join(', ') : '',
                vaccineNames: vaccinated ? normalizedVaccines : [],
                ownerName: ownerName.trim(),
                ownerEmail: ownerEmail.trim(),
                ownerPhone: ownerPhone.trim(),
                ownerAddress: ownerAddress.trim(),
                ownerContact: ownerPhone.trim(),
                careTasks: buildDefaultCareTasks(),
            };

            const newPetDoc = await addDoc(petsCollectionRef, petToSave);

            onAddPet({
                id: newPetDoc.id,
                ...petToSave,
            });

            setName('');
            setPetType('Dog');
            setOtherPetType('');
            setAgeNumber('');
            setAgeUnit('years');
            setVaccinated(false);
            setSelectedVaccines([]);
            setVaccineName('');
            setOwnerName('');
            setOwnerEmail('');
            setOwnerPhone('');
            setOwnerAddress('');
            setErrorMessage('');
            navigate('/pets');
        } catch (error) {
            console.error('Firebase save error:', error);
            setErrorMessage(`${t.firebaseError} ${error.message}`);
        } finally {
            setIsSaving(false);
        }
    };

    const handleVaccinatedChange = (event) => {
        const checked = event.target.checked;
        setVaccinated(checked);
        if (!checked) {
            setSelectedVaccines([]);
            setVaccineName('');
        }
    };

    const handleVaccineToggle = (value) => {
        setSelectedVaccines((current) => (
            current.includes(value)
                ? current.filter((item) => item !== value)
                : [...current, value]
        ));
    };

    const vaccineOptions = language === 'pt'
        ? ['V8', 'V10', 'Antirrabica', 'Gripe Canina', 'Giardia', 'V4 Felina']
        : ['DHPP', 'Rabies', 'Bordetella', 'Canine Flu', 'Leptospirosis', 'FVRCP'];
    
  return (
    <form className='formbox' onSubmit={handleFormSubmission}> 
        <p className='section-kicker'>{t.kicker}</p>
        <h2>{t.heading}</h2>
        <p className='form-subtitle'>{t.subtitle}</p>
        { errorMessage !== '' && ( 
            <div className='formerror'>{errorMessage}</div>
        )}
        { isSaving && (
            <div className='forminfo'>{t.savingInfo}</div>
        )}

        <label className='formlabel'>{t.petName}:
            <input className='forminput' type='text' maxLength={500}
            value={name}
            disabled={isSaving}
            onChange={(event) => setName(event.target.value)}/> 
        </label>

        <label className='formlabel'>{t.petType}:
            <select className='formselect' value={petType}
            disabled={isSaving}
            onChange={(event) => {
                setPetType(event.target.value);
                if (event.target.value !== 'Other') {
                    setOtherPetType('');
                }
            }}>
                <option value='Dog'>{t.dog}</option>
                <option value='Cat'>{t.cat}</option>
                <option value='Other'>{t.other}</option>
            </select>
        </label>

        {petType === 'Other' && (
            <label className='formlabel'>{t.otherTypeLabel}:
                <input
                className='forminput'
                type='text'
                maxLength={80}
                placeholder={t.otherTypePlaceholder}
                value={otherPetType}
                disabled={isSaving}
                onChange={(event) => setOtherPetType(event.target.value)}
                />
            </label>
        )}

        <label className='formlabel'>{t.age}:
            <div className='form-age-row'>
                <input
                    className='forminput'
                    type='number'
                    min='0'
                    step='1'
                    placeholder={t.ageNumber}
                    value={ageNumber}
                    disabled={isSaving}
                    onChange={(event) => setAgeNumber(event.target.value)}
                />
                <select
                    className='formselect'
                    value={ageUnit}
                    disabled={isSaving}
                    onChange={(event) => setAgeUnit(event.target.value)}
                >
                    <option value='years'>{t.years}</option>
                    <option value='months'>{t.months}</option>
                </select>
            </div>
        </label>

        <label className='formlabel'>{t.ownerName}:
            <input className='forminput' type='text' maxLength={200}
            value={ownerName}
            disabled={isSaving}
            onChange={(event) => setOwnerName(event.target.value)}/>
        </label>

        <label className='formlabel'>{t.ownerEmail}:
            <input className='forminput' type='email' maxLength={200}
            value={ownerEmail}
            disabled={isSaving}
            onChange={(event) => setOwnerEmail(event.target.value)}/>
        </label>

        <label className='formlabel'>{t.ownerPhone}:
            <input
            className='forminput'
            type='tel'
            maxLength={t.phoneMaxLength}
            inputMode='numeric'
            pattern={t.phonePattern}
            placeholder={t.phonePlaceholder}
            value={ownerPhone}
            disabled={isSaving}
            onChange={(event) => setOwnerPhone(formatPhone(event.target.value, language))}/>
        </label>

        <label className='formlabel'>{t.ownerAddress}:
            <input
            className='forminput'
            type='text'
            maxLength={250}
            placeholder={t.ownerAddressPlaceholder}
            value={ownerAddress}
            disabled={isSaving}
            onChange={(event) => setOwnerAddress(event.target.value)}/>
        </label>

        <label className='formcheck'>
            <input
                type='checkbox'
                checked={vaccinated}
                disabled={isSaving}
                onChange={handleVaccinatedChange}
            />
            <span>{t.vaccinated}</span>
        </label>

        {vaccinated && (
            <>
                <div className='formlabel'>
                    <span>{t.vaccinePick}</span>
                    <div>
                        {vaccineOptions.map((option) => (
                            <label key={option} className='formcheck'>
                                <input
                                    type='checkbox'
                                    checked={selectedVaccines.includes(option)}
                                    disabled={isSaving}
                                    onChange={() => handleVaccineToggle(option)}
                                />
                                <span>{option}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <label className='formlabel'>{t.vaccineOther}:
                    <input
                    className='forminput'
                    type='text'
                    maxLength={120}
                    placeholder={t.vaccinePlaceholder}
                    value={vaccineName}
                    disabled={isSaving}
                    onChange={(event) => setVaccineName(event.target.value)}
                    />
                </label>
            </>
        )}

        <button className='formbutton' type='submit' disabled={isSaving}>{isSaving ? t.saving : t.submit}</button>
    </form> 
    );
}

export default Form;