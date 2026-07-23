/**
 * Course: INFO-5143 – JavaScript 4
 * Professor: Marcelo Hespanhol
 * Project: Major Project
 * Description: Tasks component - Display all registered pets in a list with optional empty state.
 * Handles pet listing, pet deletion with confirmation, and empty state UI.
 */

import { useState } from 'react';
import Task from './Task/Task';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import { useLanguage } from '../../context/LanguageContext';
import brandLogo from '../../images/logo.png';

const COPY = {
  en: {
    clearTitle: 'Clear all pets',
    clearMessage: 'Are you sure you want to remove all pets? This action cannot be undone.',
    kicker: 'Pets',
    heading: 'All registered pets',
    clearButton: 'Clear Pets',
    loading: 'Loading pets...',
    loadError: 'Could not load pets from Firebase.',
    empty: 'No pets yet. Open Add Pet to create the first profile.',
  },
  pt: {
    clearTitle: 'Limpar todos os pets',
    clearMessage: 'Tem certeza que deseja remover todos os pets? Esta acao nao pode ser desfeita.',
    kicker: 'Pets',
    heading: 'Todos os pets cadastrados',
    clearButton: 'Limpar Pets',
    loading: 'Carregando pets...',
    loadError: 'Nao foi possivel carregar os pets do Firebase.',
    empty: 'Ainda nao ha pets. Abra Adicionar Pet para criar o primeiro perfil.',
  },
};

// Renders the pet list page with optional empty state, loading, and error indicators
function Tasks({
    pets,
    isLoading,
    loadError,
    onPetRemove,
    onClearPets
}) {
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const { language } = useLanguage();
  const t = COPY[language];

  return (
    <>
      {showClearConfirm && (
        <ConfirmModal
          title={t.clearTitle}
          message={t.clearMessage}
          onConfirm={() => { setShowClearConfirm(false); onClearPets(); }}
          onCancel={() => setShowClearConfirm(false)}
        />
      )}
      <section className='tasks'>
        <div className='taskshead'>
          <div>
            <p className='section-kicker'>{t.kicker}</p>
            <h2>{t.heading}</h2>
          </div>
          {pets.length > 0 && (
            <button className='tasksclear' onClick={() => setShowClearConfirm(true)}>{t.clearButton}</button>
          )}
        </div>

        <div className='taskslist'>
          {isLoading && (
            <p className='tasksempty'>{t.loading}</p>
          )}

          {loadError !== '' && (
            <p className='tasksempty'>{t.loadError}</p>
          )}

          {!isLoading && loadError === '' && pets.length === 0 && (
            <div className='tasksempty tasksempty--center'>
              <img className='tasksempty-logo' src={brandLogo} alt='Pet Care Tracker logo' />
              <p className='tasksempty-text'>{t.empty}</p>
            </div>
          )}

          {!isLoading && pets.map((pet) => (
            <Task 
              key={pet.id}
              pet={pet}
              onTaskRemove={onPetRemove}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default Tasks;