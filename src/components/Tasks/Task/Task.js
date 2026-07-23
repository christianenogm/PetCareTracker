/**
 * Course: INFO-5143 – JavaScript 4
 * Professor: Marcelo Hespanhol
 * Project: Major Project
 * Description: Task component - Pet card that displays pet summary information.
 * Shows pet profile overview with image, name, type, and link to detailed profile.
 */

import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import ConfirmModal from '../../ConfirmModal/ConfirmModal';
import brandLogo from '../../../images/logo.png';
import { useLanguage } from '../../../context/LanguageContext';
import { buildPetSlug } from '../../../utils/petSlug';

const COPY = {
    en: {
        removeTitle: 'Remove pet',
        removeMessage: (name) => `Are you sure you want to remove ${name}? This action cannot be undone.`,
        removeFailed: 'Could not remove. Check Firestore rules.',
        vaccinated: 'Vaccinated',
        pending: 'Vaccine pending',
        vaccineLabel: 'Vaccine',
        age: 'Age',
        owner: 'Owner',
        contact: 'Phone',
        email: 'Email',
        address: 'Address',
        tasksDone: (done, total) => `${done} / ${total} care tasks done`,
        details: 'View Details',
        removing: 'Removing...',
        remove: 'Remove',
    },
    pt: {
        removeTitle: 'Remover pet',
        removeMessage: (name) => `Tem certeza que deseja remover ${name}? Esta acao nao pode ser desfeita.`,
        removeFailed: 'Nao foi possivel remover. Verifique as regras do Firestore.',
        vaccinated: 'Vacinado',
        pending: 'Vacina pendente',
        vaccineLabel: 'Vacina',
        age: 'Idade',
        owner: 'Tutor',
        contact: 'Telefone',
        email: 'Email',
        address: 'Endereco',
        tasksDone: (done, total) => `${done} / ${total} tarefas concluidas`,
        details: 'Ver Detalhes',
        removing: 'Removendo...',
        remove: 'Remover',
    },
};

// Pet card component - displays pet summary with link to detailed profile
function Task ({ pet, onTaskRemove }) {
    // State for delete confirmation and error handling
    const [isRemoving, setIsRemoving] = useState(false);
    const [removeError, setRemoveError] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);
    // Handle image loading failures
    const [imageFallback, setImageFallback] = useState(false);
    const { language } = useLanguage();
    const t = COPY[language];
    const ownerPhone = pet.ownerPhone || pet.ownerContact || '';
    const ownerEmail = pet.ownerEmail || '';
    const ownerAddress = pet.ownerAddress || '';

    const formatAge = () => {
        if (pet.ageValue !== null && pet.ageValue !== undefined && pet.ageUnit) {
            const ageValue = Number(pet.ageValue);
            if (!Number.isNaN(ageValue)) {
                if (language === 'pt') {
                    const unit = pet.ageUnit === 'months' ? (ageValue === 1 ? 'mes' : 'meses') : (ageValue === 1 ? 'ano' : 'anos');
                    return `${ageValue} ${unit}`;
                }

                const unit = pet.ageUnit === 'months' ? (ageValue === 1 ? 'month' : 'months') : (ageValue === 1 ? 'year' : 'years');
                return `${ageValue} ${unit}`;
            }
        }

        return pet.age || '';
    };

    const ageText = formatAge();
    const petDetailsPath = `/pets/${encodeURIComponent(buildPetSlug(pet.name))}`;

    // Use brand logo for all pet cards
    const petImage = brandLogo;

    const handleRemoveClick = () => {
        setShowConfirm(true);
    };

    const handleConfirmRemove = async () => {
        setShowConfirm(false);
        const id = pet.id;
        setRemoveError('');
        setIsRemoving(true);

        try {
            await deleteDoc(doc(db, 'pets', id));
            onTaskRemove(id);
        } catch (error) {
            console.error('Remove failed:', error);
            setRemoveError(t.removeFailed);
        } finally {
            setIsRemoving(false);
        }
    };
    
    return (
        <>
            {showConfirm && (
                <ConfirmModal
                    title={t.removeTitle}
                    message={t.removeMessage(pet.name)}
                    onConfirm={handleConfirmRemove}
                    onCancel={() => setShowConfirm(false)}
                />
            )}
            <article className='task'>
                <div className='taskhead'>
                    <img
                        className='taskthumb'
                        src={petImage}
                        alt={`${pet.name} profile`}
                        onError={() => setImageFallback(true)}
                    />
                    <div className='taskheadcontent'>
                        <div className='tasktopline'>
                            <span className='tasktype'>{pet.type}</span>
                            <span className={`vaccinepill ${pet.vaccinated ? 'vaccinated' : 'missing'}`}>
                                {pet.vaccinated ? (pet.vaccineName ? `${t.vaccineLabel}: ${pet.vaccineName}` : t.vaccinated) : t.pending}
                            </span>
                        </div>

                        <h3 className='taskdesc'>
                            <Link className='taskname-link' to={petDetailsPath}>{pet.name}</Link>
                        </h3>
                    </div>
                </div>
                {ageText !== '' && <p className='taskcare'>{t.age}: {ageText}</p>}
                <p className='taskcare'>{t.owner}: {pet.ownerName}</p>
                {ownerEmail !== '' && <p className='taskcare'>{t.email}: {ownerEmail}</p>}
                {ownerPhone !== '' && <p className='taskcare'>{t.contact}: {ownerPhone}</p>}
                {ownerAddress !== '' && <p className='taskcare'>{t.address}: {ownerAddress}</p>}

                <div className='taskmeta'>
                    <span>{t.tasksDone(pet.careTasks?.filter(task => task.done).length || 0, pet.careTasks?.length || 0)}</span>
                </div>

                {removeError !== '' && (
                    <p className='formerror'>{removeError}</p>
                )}

                <div className='taskactions'>
                    <Link className='taskdetails' to={petDetailsPath}>{t.details}</Link>
                    <button className='taskremove' disabled={isRemoving} onClick={handleRemoveClick}>{isRemoving ? t.removing : t.remove}</button>
                </div>
            </article>
        </>
    );
}

export default Task;