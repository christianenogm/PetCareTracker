/**
 * Course: INFO-5143 – JavaScript 4
 * Professor: Marcelo Hespanhol
 * Project: Major Project
 * Description: HelpTopics - Nested help pages with topic-specific content.
 * Provides FAQ sections for different app features (Add, Edit, View, Remove).
 */

import { useLanguage } from '../../context/LanguageContext';

function HelpOverview() {
  const { language } = useLanguage();
  const isPt = language === 'pt';

  return (
    <article>
      <h3>{isPt ? 'Inicio FAQ' : 'FAQ Home'}</h3>
      {isPt ? (
        <>
          <p>
            O Pet Care Tracker ajuda tutores a organizar perfis de pets, informacoes dos tutores e tarefas
            diarias de cuidado em um so lugar. Voce pode cadastrar pets, abrir a pagina de detalhes de cada um,
            acompanhar atividades de cuidado e remover perfis que nao precisa mais.
          </p>
          <p>
            Use o menu principal para navegar entre Pets, Adicionar Pet e FAQ. Cada card de pet possui
            um botao Ver Detalhes que abre a pagina onde as tarefas de cuidado sao gerenciadas.
          </p>
        </>
      ) : (
        <>
          <p>
            Pet Care Tracker helps pet owners organize pet profiles, owner information, and daily care tasks
            in one place. You can register pets, open a details page for each pet, track care activities,
            and remove profiles you no longer need.
          </p>
          <p>
            Use the main menu to navigate between Pets, Add Pet, and FAQ pages. Each pet card includes
            a View Details button that opens the page where care tasks are managed.
          </p>
        </>
      )}
    </article>
  );
}

function HelpAdd() {
  const { language } = useLanguage();
  const isPt = language === 'pt';

  return (
    <article>
      <h3>{isPt ? 'Adicionar Pet' : 'Add Pet'}</h3>
      {isPt ? (
        <>
          <p>
            Abra Adicionar Pet no menu principal e complete o formulario com nome do pet, tipo, idade opcional,
            checkbox de vacinacao, nome do tutor e contato do tutor.
          </p>
          <p>
            Depois de enviar, o perfil e salvo no Firebase e aparece na pagina Pets. O app tambem
            cria tarefas iniciais como Alimentar, Passear, Consulta veterinaria e Banho para esse pet.
          </p>
        </>
      ) : (
        <>
          <p>
            Open Add Pet from the main menu and complete the form with the pet name, type, optional age,
            vaccination checkbox, owner name, and owner contact.
          </p>
          <p>
            After submitting, the profile is saved to Firebase and appears in the Pets page. The app also
            creates starter care tasks such as Feed, Walk, Vet appointment, and Bath for that pet.
          </p>
        </>
      )}
    </article>
  );
}

function HelpDetails() {
  const { language } = useLanguage();
  const isPt = language === 'pt';

  return (
    <article>
      <h3>{isPt ? 'Detalhes do Pet' : 'Pet Details'}</h3>
      {isPt ? (
        <>
          <p>
            Abra Ver Detalhes em qualquer card para ver o perfil completo do pet. Esta pagina mostra tipo,
            idade, status de vacinacao, nome do tutor e contato do tutor.
          </p>
          <p>
            A mesma pagina tambem contem a lista de tarefas de cuidado. Voce pode marcar Alimentar, Passear,
            Consulta veterinaria, Banho ou qualquer tarefa personalizada como concluida.
          </p>
        </>
      ) : (
        <>
          <p>
            Open View Details on any pet card to see the full pet profile. This page shows the pet type,
            age, vaccination status, owner name, and owner contact information.
          </p>
          <p>
            The same page also contains the care task list. You can mark Feed, Walk, Vet appointment,
            Bath, or any custom task as completed, and you can add another care task if needed.
          </p>
        </>
      )}
    </article>
  );
}

function HelpRemove() {
  const { language } = useLanguage();
  const isPt = language === 'pt';

  return (
    <article>
      <h3>{isPt ? 'Remover Pet' : 'Remove Pet'}</h3>
      {isPt ? (
        <>
          <p>
            Va para a pagina Pets e localize o perfil que deseja remover. Clique em Remover nesse card para
            excluir apenas esse pet da lista e do Firebase.
          </p>
          <p>
            Se precisar reiniciar rapidamente, use o botao Limpar Pets no topo da lista.
          </p>
        </>
      ) : (
        <>
          <p>
            Go to the Pets page and locate the profile you want to remove. Click Remove Pet on that card to
            delete only that pet from the list and from Firebase.
          </p>
          <p>
            If you need to reset the app quickly, use the Clear Pets button at the top of the list section.
          </p>
        </>
      )}
    </article>
  );
}

function HelpChange() {
  const { language } = useLanguage();
  const isPt = language === 'pt';

  return (
    <article>
      <h3>{isPt ? 'Tarefas de Cuidado' : 'Care Tasks'}</h3>
      {isPt ? (
        <>
          <p>
            Abra a pagina de Detalhes do Pet e use os checkboxes na lista de tarefas para mudar o status
            entre pendente e concluida.
          </p>
          <p>
            Voce tambem pode adicionar uma nova tarefa personalizada na mesma secao, salva para aquele pet.
          </p>
        </>
      ) : (
        <>
          <p>
            Open the Pet Details page and use the checkboxes in the care task list to change a task between
            pending and completed. This is useful for tracking routines without deleting the pet profile.
          </p>
          <p>
            You can also add a new custom care task in the same section, which is saved with that specific pet.
          </p>
        </>
      )}
    </article>
  );
}

export { HelpOverview, HelpAdd, HelpDetails, HelpRemove, HelpChange };
