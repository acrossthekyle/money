'use client';

import tw from '@/styles';
import type { Holding, Syncable } from '@/types';
import Ui from '@/ui'
import { currency } from '@/utils';

import { useModel } from './model';

type Props = {
  choices: Holding[];
  unsynced: Syncable[];
};

export default function Steps({ choices, unsynced }: Props) {
  const {
    choice,
    handleOnSave,
    handleOnSelect,
    isPending,
    linked,
    step,
    total,
  } = useModel(unsynced);

  if (unsynced.length === 0) {
    return null;
  }

  return (
    <>
      <Ui.Drawer.Header>
        <h2 className={styles.header} id="drawer-header">
          Link Balances
        </h2>
        <p className={styles.lid}>
          Sync {step + 1} of {total + 1}: {unsynced[step].name} {unsynced[step].type} ${currency(unsynced[step].balance, true)}
        </p>
        <Ui.Components.Progress.Container>
          <Ui.Components.Progress.Bar>
            <Ui.Components.Progress.Progress
              percent={(step/total) * 100}
            />
          </Ui.Components.Progress.Bar>
        </Ui.Components.Progress.Container>
      </Ui.Drawer.Header>
      <Ui.Drawer.Body>
        <Ui.Form.Container>
          <Ui.Form.Field>
            <Ui.Form.Options>
              {choices.map((item) => (
                <Ui.Form.Option
                  isActive={item.id === choice}
                  isDisabled={linked.indexOf(item.id) > -1}
                  key={item.id}
                  label={item.name}
                  onSelect={() => handleOnSelect(item.id)}
                />
              ))}
            </Ui.Form.Options>
          </Ui.Form.Field>
        </Ui.Form.Container>
      </Ui.Drawer.Body>
      <Ui.Drawer.Footer>
        <Ui.Components.Button
          isDisabled={isPending || !choice}
          isPrimary
          onClick={handleOnSave}
        >
          {step === total ? 'Save' : 'Next'}
        </Ui.Components.Button>
      </Ui.Drawer.Footer>
    </>
  );
};

const styles = tw({
  header: `
    pr-12
    truncate
  `,
  lid: `
    mb-3
    text-current/62.5

    sm:text-sm
  `,
  items: `
    flex flex-col gap-4
    mt-1
  `,
});
