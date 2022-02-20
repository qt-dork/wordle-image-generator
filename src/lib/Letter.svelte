<script lang="ts">
  type Status = 'wrong' | 'misplaced' | 'perfect';
  export let status:Status = 'wrong';
</script>

<div class="letter {status}"></div>

<style>
  .letter {
    width: 24px;
    height: 24px;
    border-radius: 4px;
  }

  .wrong {
    border: 2px solid var(--wrong-border);
    background: linear-gradient(180deg, var(--wrong-gradient) 0%, var(--wrong-border) 100%);
  }

  .misplaced {
    border: 2px solid var(--misplaced-border);
    background: linear-gradient(180deg, var(--misplaced-gradient) 0%, var(--misplaced-border) 100%);
  }

  .perfect {
    border: 2px solid var(--perfect-border);
    background: linear-gradient(180deg, var(--perfect-gradient) 0%, var(--perfect-border) 100%);
  }

</style>