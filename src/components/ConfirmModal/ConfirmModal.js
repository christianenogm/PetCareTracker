/**
 * Course: INFO-5143 – JavaScript 4
 * Professor: Marcelo Hespanhol
 * Project: Major Project
 * Description: ConfirmModal component - Reusable confirmation dialog for destructive actions.
 * Used for pet deletion and other critical operations requiring user confirmation.
 */

import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

// Reusable confirmation dialog component for destructive operations
function ConfirmModal({ title, message, onConfirm, onCancel, cancelLabel, confirmLabel }) {
    // Get language for default button labels
    const { language } = useLanguage();
    const defaultCancel = language === 'pt' ? 'Cancelar' : 'Cancel';
    const defaultConfirm = language === 'pt' ? 'Sim, remover' : 'Yes, remove';

    return (
        <div className='modal-backdrop' onClick={onCancel}>
            <div className='modal-box' onClick={(e) => e.stopPropagation()}>
                <h3 className='modal-title'>{title}</h3>
                <p className='modal-message'>{message}</p>
                <div className='modal-actions'>
                    <button className='modal-cancel' onClick={onCancel}>{cancelLabel || defaultCancel}</button>
                    <button className='modal-confirm' onClick={onConfirm}>{confirmLabel || defaultConfirm}</button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;
