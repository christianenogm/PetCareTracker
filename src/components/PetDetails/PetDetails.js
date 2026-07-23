/**
 * Course: INFO-5143 – JavaScript 4
 * Professor: Marcelo Hespanhol
 * Project: Major Project
 * Description: PetDetails component - Display detailed pet profile with care tasks management.
 * Handles pet data display, task management (add, complete, delete), and pet editing.
 */

import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import brandLogo from '../../images/logo.png';
import { useLanguage } from '../../context/LanguageContext';
import { buildPetSlug, findPetByRouteValue } from '../../utils/petSlug';

const COPY = {
  en: {
    taskRequired: 'Enter a care task name.',
    taskRemoveTitle: 'Remove care task',
    taskRemoveMessage: (label) => `Are you sure you want to remove "${label}"?`,
    taskRemoveError: 'Could not remove the care task.',
    taskSaveError: 'Could not save the care task.',
    taskUpdateError: 'Could not update the care task.',
    requiredFields: 'Pet name, owner name, owner contact, and owner address are required.',
    otherTypeRequired: 'Enter the pet type when Other is selected.',
    saveError: 'Could not save changes. Please try again.',
    loading: 'Loading pet details...',
    notFoundTitle: 'Pet Profile Not Found',
    notFoundText: 'This pet profile was not found. It may have been removed.',
    backToPets: 'Back to Pets',
    removeTitle: 'Remove pet',
    removeMessage: (name) => `Are you sure you want to remove ${name}? This action cannot be undone.`,
    profile: 'Pet Profile',
    editPet: 'Edit Pet',
    edit: 'Edit',
    petName: 'Pet Name',
    petType: 'Pet Type',
    otherTypeLabel: 'Which pet type?',
    otherTypePlaceholder: 'e.g. Rabbit, Hamster, Bird',
    ageOptional: 'Age (optional)',
    agePlaceholder: 'e.g. 2 years',
    ownerName: 'Owner Name',
    ownerEmail: 'Owner Email',
    ownerPhone: 'Owner Phone',
    ownerAddress: 'Owner Address',
    ownerContact: 'Owner Contact',
    ownerPlaceholder: 'Phone or email',
    ownerAddressPlaceholder: 'Street, number, city, province',
    vaccinated: 'Vaccinated',
    saveChanges: 'Save Changes',
    saving: 'Saving...',
    cancel: 'Cancel',
    type: 'Type',
    age: 'Age',
    yes: 'Yes',
    pending: 'Pending',
    owner: 'Owner',
    email: 'Email',
    contact: 'Phone',
    address: 'Address',
    vaccineLabel: 'Vaccine',
    careTasks: 'Care Tasks',
    dailyCare: 'Daily care & appointments',
    doneCount: (done, total) => `${done} / ${total} done`,
    addTask: 'Add a care task',
    taskDate: 'Appointment date (optional)',
    addTaskPlaceholder: 'e.g. Grooming, medication...',
    noDate: 'No date',
    addTaskButton: '+ Add Care Task',
    removeTask: 'Remove',
    removePet: 'Remove Pet',
    dog: 'Dog',
    cat: 'Cat',
    other: 'Other',
  },
  pt: {
    taskRequired: 'Informe o nome de uma tarefa de cuidado.',
    taskRemoveTitle: 'Remover tarefa de cuidado',
    taskRemoveMessage: (label) => `Tem certeza que deseja remover "${label}"?`,
    taskRemoveError: 'Nao foi possivel remover a tarefa de cuidado.',
    taskSaveError: 'Nao foi possivel salvar a tarefa de cuidado.',
    taskUpdateError: 'Nao foi possivel atualizar a tarefa de cuidado.',
    requiredFields: 'Nome do pet, nome do tutor, contato e endereco do tutor sao obrigatorios.',
    otherTypeRequired: 'Informe qual e o tipo de pet quando selecionar Outro.',
    saveError: 'Nao foi possivel salvar as alteracoes. Tente novamente.',
    loading: 'Carregando detalhes do pet...',
    notFoundTitle: 'Perfil do Pet Nao Encontrado',
    notFoundText: 'Este perfil de pet nao foi encontrado. Ele pode ter sido removido.',
    backToPets: 'Voltar para Pets',
    removeTitle: 'Remover pet',
    removeMessage: (name) => `Tem certeza que deseja remover ${name}? Esta acao nao pode ser desfeita.`,
    profile: 'Perfil do Pet',
    editPet: 'Editar Pet',
    edit: 'Editar',
    petName: 'Nome do Pet',
    petType: 'Tipo de Pet',
    otherTypeLabel: 'Qual tipo de pet?',
    otherTypePlaceholder: 'ex.: Coelho, Hamster, Passaro',
    ageOptional: 'Idade (opcional)',
    agePlaceholder: 'ex.: 2 anos',
    ownerName: 'Nome do Tutor',
    ownerEmail: 'Email do Tutor',
    ownerPhone: 'Telefone do Tutor',
    ownerAddress: 'Endereco do Tutor',
    ownerContact: 'Contato do Tutor',
    ownerPlaceholder: 'Telefone ou email',
    ownerAddressPlaceholder: 'Rua, numero, cidade, provincia',
    vaccinated: 'Vacinado',
    saveChanges: 'Salvar Alteracoes',
    saving: 'Salvando...',
    cancel: 'Cancelar',
    type: 'Tipo',
    age: 'Idade',
    yes: 'Sim',
    pending: 'Pendente',
    owner: 'Tutor',
    email: 'Email',
    contact: 'Telefone',
    address: 'Endereco',
    vaccineLabel: 'Vacina',
    careTasks: 'Tarefas de Cuidado',
    dailyCare: 'Cuidados diarios e compromissos',
    doneCount: (done, total) => `${done} / ${total} concluidas`,
    addTask: 'Adicionar tarefa de cuidado',
    taskDate: 'Data do compromisso (opcional)',
    addTaskPlaceholder: 'ex.: Banho, medicacao...',
    noDate: 'Sem data',
    addTaskButton: '+ Adicionar Tarefa',
    removeTask: 'Remover',
    removePet: 'Remover Pet',
    dog: 'Cachorro',
    cat: 'Gato',
    other: 'Outro',
  },
};

function PetDetails({ pets, isLoading, onCareTaskToggle, onCareTaskAdd, onCareTaskRemove, onPetRemove, onPetUpdate }) {
  // Get pet slug from URL route
  const { petSlug } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = COPY[language];

  // Care task input state
  const [newTaskLabel, setNewTaskLabel] = useState('');
  const [newTaskDate, setNewTaskDate] = useState('');
  // Track which task is being removed for confirmation
  const [taskToRemove, setTaskToRemove] = useState(null);
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);
  const [taskError, setTaskError] = useState('');
  const [taskSaving, setTaskSaving] = useState(false);

  // Edit pet profile state
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editType, setEditType] = useState('Dog');
  const [editOtherType, setEditOtherType] = useState('');
  const [editAge, setEditAge] = useState('');
  const [editVaccinated, setEditVaccinated] = useState(false);
  const [editOwnerName, setEditOwnerName] = useState('');
  const [editOwnerContact, setEditOwnerContact] = useState('');
  const [editOwnerAddress, setEditOwnerAddress] = useState('');
  const [editError, setEditError] = useState('');
  const [editSaving, setEditSaving] = useState(false);

  const pet = findPetByRouteValue(pets, petSlug);
  const ownerPhone = pet?.ownerPhone || pet?.ownerContact || '';
  const ownerEmail = pet?.ownerEmail || '';
  const ownerAddress = pet?.ownerAddress || '';

  const formatAge = (petData) => {
    if (petData.ageValue !== null && petData.ageValue !== undefined && petData.ageUnit) {
      const ageValue = Number(petData.ageValue);
      if (!Number.isNaN(ageValue)) {
        if (language === 'pt') {
          const unit = petData.ageUnit === 'months' ? (ageValue === 1 ? 'mes' : 'meses') : (ageValue === 1 ? 'ano' : 'anos');
          return `${ageValue} ${unit}`;
        }

        const unit = petData.ageUnit === 'months' ? (ageValue === 1 ? 'month' : 'months') : (ageValue === 1 ? 'year' : 'years');
        return `${ageValue} ${unit}`;
      }
    }

    return petData.age || '—';
  };

  const handlePetRemove = async (id) => {
    await deleteDoc(doc(db, 'pets', id));
    onPetRemove(id);
    navigate('/pets');
  };

  const handleAddTask = async (event) => {
    event.preventDefault();
    setTaskError('');
    if (newTaskLabel.trim() === '') {
      setTaskError(t.taskRequired);
      return;
    }
    setTaskSaving(true);
    try {
      await onCareTaskAdd(pet.id, newTaskLabel, newTaskDate);
      setNewTaskLabel('');
      setNewTaskDate('');
    } catch (error) {
      setTaskError(t.taskSaveError);
    } finally {
      setTaskSaving(false);
    }
  };

  const formatTaskDate = (dateText) => {
    if (!dateText) {
      return t.noDate;
    }

    const parsed = new Date(`${dateText}T00:00:00`);
    if (Number.isNaN(parsed.getTime())) {
      return dateText;
    }

    return new Intl.DateTimeFormat(language === 'pt' ? 'pt-BR' : 'en-CA', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    }).format(parsed);
  };

  const handleToggleTask = async (taskId) => {
    setTaskError('');
    try {
      await onCareTaskToggle(pet.id, taskId);
    } catch (error) {
      setTaskError(t.taskUpdateError);
    }
  };

  const handleRemoveTask = async (taskId) => {
    setTaskError('');
    try {
      await onCareTaskRemove(pet.id, taskId);
    } catch (error) {
      setTaskError(t.taskRemoveError);
    }
  };

  const startEdit = () => {
    const baseType = ['Dog', 'Cat', 'Other'].includes(pet.type) ? pet.type : 'Other';
    setEditName(pet.name);
    setEditType(baseType);
    setEditOtherType(baseType === 'Other' && pet.type !== 'Other' ? pet.type : '');
    setEditAge(pet.age || '');
    setEditVaccinated(pet.vaccinated || false);
    setEditOwnerName(pet.ownerName);
    setEditOwnerContact(pet.ownerContact);
    setEditOwnerAddress(pet.ownerAddress || '');
    setEditError('');
    setIsEditing(true);
  };

  const handleSaveEdit = async (event) => {
    event.preventDefault();
    setEditError('');
    if (editName.trim() === '' || editOwnerName.trim() === '' || editOwnerContact.trim() === '' || editOwnerAddress.trim() === '') {
      setEditError(t.requiredFields);
      return;
    }
    if (editType === 'Other' && editOtherType.trim() === '') {
      setEditError(t.otherTypeRequired);
      return;
    }
    setEditSaving(true);
    try {
      const nextName = editName.trim();
      await onPetUpdate(pet.id, {
        name: nextName,
        type: editType === 'Other' ? editOtherType.trim() : editType,
        age: editAge.trim(),
        vaccinated: editVaccinated,
        ownerName: editOwnerName.trim(),
        ownerContact: editOwnerContact.trim(),
        ownerAddress: editOwnerAddress.trim(),
      });
      setIsEditing(false);
      navigate(`/pets/${encodeURIComponent(buildPetSlug(nextName))}`, { replace: true });
    } catch (error) {
      setEditError(t.saveError);
    } finally {
      setEditSaving(false);
    }
  };

  if (isLoading) {
    return (
      <section className='detailscard detailsloading'>
        <p>{t.loading}</p>
      </section>
    );
  }

  if (!pet) {
    return (
      <section className='detailscard pet-not-found'>
        <img className='pet-not-found-logo' src={brandLogo} alt='Pet Care Tracker logo' />
        <h2>{t.notFoundTitle}</h2>
        <p>{t.notFoundText}</p>
        <Link className='detailback' to='/pets'>{`← ${t.backToPets}`}</Link>
      </section>
    );
  }

  const doneCount = pet.careTasks.filter((t) => t.done).length;

  return (
    <>
      {showRemoveConfirm && (
        <ConfirmModal
          title={t.removeTitle}
          message={t.removeMessage(pet.name)}
          onConfirm={() => { setShowRemoveConfirm(false); handlePetRemove(pet.id); }}
          onCancel={() => setShowRemoveConfirm(false)}
        />
      )}
      {taskToRemove && (
        <ConfirmModal
          title={t.taskRemoveTitle}
          message={t.taskRemoveMessage(taskToRemove.label)}
          onConfirm={() => {
            const id = taskToRemove.id;
            setTaskToRemove(null);
            handleRemoveTask(id);
          }}
          onCancel={() => setTaskToRemove(null)}
        />
      )}
    <section className='detailspage'>
      <Link className='detailback' to='/pets'>{`← ${t.backToPets}`}</Link>

      <div className='detailscard'>
        <div className='detailscardhead'>
          <div>
            <p className='section-kicker'>{t.profile}</p>
            <h2>{isEditing ? t.editPet : pet.name}</h2>
          </div>
          {!isEditing && (
            <button className='editbutton' type='button' onClick={startEdit}>{t.edit}</button>
          )}
        </div>

        {isEditing ? (
          <form className='editpetform' onSubmit={handleSaveEdit}>
            {editError !== '' && <div className='formerror'>{editError}</div>}
            <label className='formlabel'>{t.petName}
              <input className='forminput' type='text' maxLength={500} value={editName} disabled={editSaving}
                onChange={(e) => setEditName(e.target.value)} />
            </label>
            <label className='formlabel'>{t.petType}
              <select className='formselect' value={editType} disabled={editSaving}
                onChange={(e) => {
                  setEditType(e.target.value);
                  if (e.target.value !== 'Other') {
                    setEditOtherType('');
                  }
                }}>
                <option value='Dog'>{t.dog}</option>
                <option value='Cat'>{t.cat}</option>
                <option value='Other'>{t.other}</option>
              </select>
            </label>
            {editType === 'Other' && (
              <label className='formlabel'>{t.otherTypeLabel}
                <input className='forminput' type='text' maxLength={80} placeholder={t.otherTypePlaceholder} value={editOtherType}
                  disabled={editSaving} onChange={(e) => setEditOtherType(e.target.value)} />
              </label>
            )}
            <label className='formlabel'>{t.ageOptional}
              <input className='forminput' type='text' maxLength={40} placeholder={t.agePlaceholder} value={editAge}
                disabled={editSaving} onChange={(e) => setEditAge(e.target.value)} />
            </label>
            <label className='formlabel'>{t.ownerName}
              <input className='forminput' type='text' maxLength={200} value={editOwnerName} disabled={editSaving}
                onChange={(e) => setEditOwnerName(e.target.value)} />
            </label>
            <label className='formlabel'>{t.ownerContact}
              <input className='forminput' type='text' maxLength={200} placeholder={t.ownerPlaceholder} value={editOwnerContact}
                disabled={editSaving} onChange={(e) => setEditOwnerContact(e.target.value)} />
            </label>
            <label className='formlabel'>{t.ownerAddress}
              <input className='forminput' type='text' maxLength={250} placeholder={t.ownerAddressPlaceholder} value={editOwnerAddress}
                disabled={editSaving} onChange={(e) => setEditOwnerAddress(e.target.value)} />
            </label>
            <label className='formcheck'>
              <input type='checkbox' checked={editVaccinated} disabled={editSaving}
                onChange={(e) => setEditVaccinated(e.target.checked)} />
              <span>{t.vaccinated}</span>
            </label>
            <div className='editpetactions'>
              <button className='formbutton' type='submit' disabled={editSaving}>
                {editSaving ? t.saving : t.saveChanges}
              </button>
              <button className='canceledit' type='button' disabled={editSaving} onClick={() => setIsEditing(false)}>
                {t.cancel}
              </button>
            </div>
          </form>
        ) : (
          <div className='detailsgrid'>
            <div className='detailsrow'>
              <span className='detailslabel'>{t.type}</span>
              <span className='detailsvalue'>{pet.type}</span>
            </div>
            <div className='detailsrow'>
              <span className='detailslabel'>{t.age}</span>
              <span className='detailsvalue'>{formatAge(pet)}</span>
            </div>
            <div className='detailsrow'>
              <span className='detailslabel'>{t.vaccinated}</span>
              <span className={`vaccinepill ${pet.vaccinated ? 'vaccinated' : 'missing'}`}>
                {pet.vaccinated ? t.yes : t.pending}
              </span>
            </div>
            {pet.vaccinated && pet.vaccineName && (
              <div className='detailsrow'>
                <span className='detailslabel'>{t.vaccineLabel}</span>
                <span className='detailsvalue'>{pet.vaccineName}</span>
              </div>
            )}
            <div className='detailsrow'>
              <span className='detailslabel'>{t.owner}</span>
              <span className='detailsvalue'>{pet.ownerName}</span>
            </div>
            {ownerEmail !== '' && (
              <div className='detailsrow'>
                <span className='detailslabel'>{t.email}</span>
                <span className='detailsvalue'>{ownerEmail}</span>
              </div>
            )}
            {ownerPhone !== '' && (
              <div className='detailsrow'>
                <span className='detailslabel'>{t.contact}</span>
                <span className='detailsvalue'>{ownerPhone}</span>
              </div>
            )}
            {ownerAddress !== '' && (
              <div className='detailsrow'>
                <span className='detailslabel'>{t.address}</span>
                <span className='detailsvalue'>{ownerAddress}</span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className='detailscard'>
        <p className='section-kicker'>{t.careTasks}</p>
        <div className='caretaskshead'>
          <h2>{t.dailyCare}</h2>
          <span className='caretaskcount'>{t.doneCount(doneCount, pet.careTasks.length)}</span>
        </div>

        <div className='caretasklist'>
          {pet.careTasks.map((task) => (
            <label key={task.id} className={`caretaskitem ${task.done ? 'completed' : ''}`}>
              <input
                type='checkbox'
                checked={task.done}
                onChange={() => handleToggleTask(task.id)}
              />
              <div className='caretaskitemcontent'>
                <span>{task.label}</span>
                <small>{formatTaskDate(task.dueDate)}</small>
              </div>
              <button
                type='button'
                className='caretaskremove'
                aria-label={t.removeTask}
                title={t.removeTask}
                onClick={(event) => {
                  event.preventDefault();
                  setTaskToRemove({ id: task.id, label: task.label });
                }}
              >
                <FaTrashAlt aria-hidden='true' />
              </button>
            </label>
          ))}
        </div>

        <form className='caretaskform' onSubmit={handleAddTask}>
          <label className='formlabel'>{t.addTask}
            <input
              className='forminput'
              type='text'
              maxLength={120}
              placeholder={t.addTaskPlaceholder}
              value={newTaskLabel}
              disabled={taskSaving}
              onChange={(event) => setNewTaskLabel(event.target.value)}
            />
          </label>
          <label className='formlabel'>{t.taskDate}
            <input
              className='forminput'
              type='date'
              value={newTaskDate}
              disabled={taskSaving}
              onChange={(event) => setNewTaskDate(event.target.value)}
            />
          </label>
          {taskError !== '' && <div className='formerror'>{taskError}</div>}
          <button className='formbutton' type='submit' disabled={taskSaving}>
            {taskSaving ? t.saving : t.addTaskButton}
          </button>
        </form>
      </div>

      <div className='detailsactions'>
        <button className='removepetbutton' onClick={() => setShowRemoveConfirm(true)}>
          {t.removePet}
        </button>
      </div>
    </section>
    </>
  );
}

export default PetDetails;