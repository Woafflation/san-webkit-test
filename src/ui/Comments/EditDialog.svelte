<script context="module" lang="ts">
  import { track } from '@/analytics'
  import { updateComment } from '@/api/comments/mutate'
  import { markdownToHTML } from '../Editor/markdown'
  import { showCommentFormDialog } from './CommentFormDialog.svelte'

  export function showCommentEditDialog(comment: SAN.Comment) {
    return showCommentFormDialog({
      title: 'Update comment',
      label: 'Update comment',
      value: markdownToHTML(comment.content),
      onSubmit: (value) =>
        updateComment(comment.id, value).then(() => {
          track.event('comments_edit', { id: comment.id })

          comment.content = value
          comment.editedAt = new Date().toISOString()
          return comment
        }),
    })
  }
</script>
