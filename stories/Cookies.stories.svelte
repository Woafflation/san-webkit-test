<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf'
  import CookiesPopup, { CookiesStyle } from '@/ui/CookiesPopup.svelte'
  import { deleteSavedValue } from '@/utils/localStorage'
  import Dialogs from '@/ui/Dialog/Dialogs.svelte'
  import { showManageCookiesDialog } from '@/ui/ManageCookiesDialog/index.svelte'
  import OnMount from './PaymentDialog/OnMount.svelte'

  deleteSavedValue('COOKIE_POLICY_ACCEPTED')
</script>

<Meta title="Example/Cookies" component={CookiesPopup} />

<Template let:args>
  <CookiesPopup {...args} />
</Template>

<Story name="Basic illustration" />
<Story name="Api illustration" args={{ style: CookiesStyle.API }} />
<Story name="Sheets illustration" args={{ style: CookiesStyle.SHEETS }} />

<Story name="Green accent" />

<Story name="Purple accent" args={{ class: '$style.purple' }} />

<Story name="'Manage cookies' dialog">
  <OnMount run={showManageCookiesDialog} />
</Story>

<Dialogs />

<style>
  .purple {
    --accent: var(--purple);
    --accent-hover: var(--purple-hover);
    --accent-light-3: var(--purple-light-3);
  }
</style>
