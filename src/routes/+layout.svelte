<script>
    import { inject } from '@vercel/analytics';
    import { dev } from '$app/environment';
    import "../app.css";
    
    inject({ mode: dev ? 'development' : 'production' });
</script>

<slot>

</slot>