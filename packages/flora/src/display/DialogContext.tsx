"use client";
import * as React from "react";
import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Dialog } from './Dialog';
import { Button } from '../input/Button';

interface DialogOptions {
    title?: string;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
    showCloseButton?: boolean;
    closeOnBackdropClick?: boolean;
}

interface DialogContextValue {
    showDialog: (content: ReactNode, options?: DialogOptions) => void;
    showAlert: (message: string, options?: DialogOptions) => void;
    showConfirm: (message: string, onConfirm: () => void, onCancel?: () => void, options?: DialogOptions) => void;
    showPrompt: (message: string, onSubmit: (value: string) => void, defaultValue?: string, options?: DialogOptions) => void;
    closeDialog: () => void;
}

const DialogContext = createContext<DialogContextValue | undefined>(undefined);

export const useDialog = () => {
    const context = useContext(DialogContext);
    if (!context) {
        throw new Error('useDialog must be used within a DialogProvider');
    }
    return context;
};

interface DialogProviderProps {
    children: ReactNode;
}

export const DialogProvider = ({ children }: DialogProviderProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [dialogContent, setDialogContent] = useState<ReactNode>(null);
    const [dialogOptions, setDialogOptions] = useState<DialogOptions>({});

    const closeDialog = useCallback(() => {
        setIsOpen(false);
    }, []);

    const showDialog = useCallback((content: ReactNode, options: DialogOptions = {}) => {
        setDialogContent(content);
        setDialogOptions(options);
        setIsOpen(true);
    }, []);

    const showAlert = useCallback((message: string, options: DialogOptions = {}) => {
        const content = (
            <div className="space-y-4">
                <p style={{ color: 'var(--on-surface)' }}>{message}</p>
                <div className="flex justify-end">
                    <Button onClick={closeDialog} variant="primary">
                        OK
                    </Button>
                </div>
            </div>
        );
        showDialog(content, { ...options });
    }, [showDialog, closeDialog]);

    const showConfirm = useCallback((
        message: string,
        onConfirm: () => void,
        onCancel?: () => void,
        options: DialogOptions = {}
    ) => {
        const handleConfirm = () => {
            onConfirm();
            closeDialog();
        };

        const handleCancel = () => {
            if (onCancel) onCancel();
            closeDialog();
        };

        const content = (
            <div className="space-y-4">
                <p style={{ color: 'var(--on-surface)' }}>{message}</p>
                <div className="flex justify-end gap-3">
                    <Button onClick={handleCancel} variant="outline">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm} variant="primary">
                        Confirm
                    </Button>
                </div>
            </div>
        );
        showDialog(content, { closeOnBackdropClick: false, ...options });
    }, [showDialog, closeDialog]);

    const showPrompt = useCallback((
        message: string,
        onSubmit: (value: string) => void,
        defaultValue: string = '',
        options: DialogOptions = {}
    ) => {
        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const value = formData.get('promptInput') as string;
            if (value && value.trim()) {
                onSubmit(value.trim());
                closeDialog();
            }
        };

        const content = (
            <form onSubmit={handleSubmit} className="space-y-4">
                <p style={{ color: 'var(--on-surface)' }}>{message}</p>
                <input
                    type="text"
                    name="promptInput"
                    defaultValue={defaultValue}
                    autoFocus
                    className="w-full px-3 py-2 rounded-md border"
                    style={{
                        backgroundColor: 'var(--background)',
                        color: 'var(--on-background)',
                        borderColor: 'var(--border)',
                    }}
                />
                <div className="flex justify-end gap-3">
                    <Button type="button" onClick={closeDialog} variant="outline">
                        Cancel
                    </Button>
                    <Button type="submit" variant="primary">
                        Submit
                    </Button>
                </div>
            </form>
        );
        showDialog(content, { closeOnBackdropClick: false, ...options });
    }, [showDialog, closeDialog]);

    const contextValue: DialogContextValue = {
        showDialog,
        showAlert,
        showConfirm,
        showPrompt,
        closeDialog,
    };

    return (
        <DialogContext.Provider value={contextValue}>
            {children}
            <Dialog
                isOpen={isOpen}
                onClose={closeDialog}
                title={dialogOptions.title}
                maxWidth={dialogOptions.maxWidth}
                showCloseButton={dialogOptions.showCloseButton}
                closeOnBackdropClick={dialogOptions.closeOnBackdropClick}
            >
                {dialogContent}
            </Dialog>
        </DialogContext.Provider>
    );
};
