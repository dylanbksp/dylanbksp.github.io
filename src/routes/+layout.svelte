<script lang="ts">
    import '../global.css';
    
    interface Props {
        children?: import('svelte').Snippet;
    }

    let { children }: Props = $props();
</script>

<div id="main-background">

    <div id="page-frame">

        <div id="navbar-background">

            <div id="navbar">
                
                <a href="/">
                    <img src="/images/dylanbksp_logo_ext.png" alt="dylanbksp" width=128 height=34 id="dylanbksp-logo-header">
                </a>

                <ul id="main-nav">
                    <li><a href="/">Home</a></li>
                    <li><a href="/bosnian">Bosnian</a></li>
                    <!--<li><a href="/">Error</a></li>
                    <li><a href="/">Error</a></li>
                    <li><a href="/">Very Long Error</a></li>-->
                </ul>

            </div>
            
        </div>

        <div id="main-content">{@render children?.()}</div>
        
        <div id="site-map">
            
            <div class="horizontal-long-center-separator"></div>

            <div id="site-explore">
                <img src="/images/hdr_explore_58x25.gif" alt="explore">
                <a href="/">My website</a>
            </div>

            <div class="horizontal-long-center-separator"></div>

            <div id="site-columns">
                <ul class="site-column">
                    <li class="site-link-header">
                        <p>My friends' sites</p>
                    </li>
                    <li>
                        <a href="https://www.kiwisin.com/" target="_blank">Kiwisin</a>
                    </li>
                    <li>
                        <a href="https://www.drogobo.com/" target="_blank">Drogobo</a>
                    </li>
                    <li>
                        <a href="https://teko.win/" target="_blank">DXD Tech</a>
                    </li>
                </ul>
                <ul class="site-column">
                    <li class="site-link-header">
                        <a href="/dev">Works-In-Progress</a>
                    </li>
                    <li>
                        <a href="/dev/quiztest">Quiz Element</a>
                    </li>
                </ul>
                <ul class="site-column">
                    <li class="site-link-header">
                        <a href="/bosnian">Bosnian Lessons</a>
                    </li>
                    <li>
                        <a href="/bosnian/orthography-and-phonology">Orthography and Phonology</a>
                    </li>
                </ul>
            </div>

            <div id="site-footer">
                <img src="/images/dylanbksp_logo_ext.png" alt="dylanbksp" width=128 height=34 id="dylanbksp-logo-footer">
            </div>
        </div>
        
    </div>

</div>