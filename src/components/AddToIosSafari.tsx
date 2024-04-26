import { Button } from '@nextui-org/react';
import React from 'react';

const AddToIosSafari = ({ closePrompt, doNotShowAgain }: { closePrompt: () => void, doNotShowAgain: () => void }) => {
    return (
        <div className='h-full flex flex-col justify-around m-5'>
            <p>Чтобы установить приложение, нажмите кнопку &quot;Поделиться&quot; и выберите &quot;Добавить на домашний экран&quot;.</p>
            <div className='flex justify-center gap-4'>
                <Button onClick={doNotShowAgain}>Не показывать снова</Button>
                <Button onClick={closePrompt}>Закрыть</Button>
            </div>
        </div>
    );
};

export default AddToIosSafari;