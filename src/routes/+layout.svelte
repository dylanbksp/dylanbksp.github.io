<script>
    import '../global.css';
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
                    <li><a href="/">Error</a></li>
                    <li><a href="/">Error</a></li>
                    <li><a href="/">Error</a></li>
                    <li><a href="/">Very Long Error</a></li>
                </ul>

            </div>
            
        </div>

        <div id="main-content"><slot></slot></div>
        
        <div id="site-map">
            <img src="/images/page_div.jpg" alt="Page divider">
            
            <div id="site-explore">
                <img src="/images/hdr_explore_58x25.gif" alt="explore">
                <a href="/">My website</a>
            </div>

            <img src="/images/page_div.jpg" alt="Page divider">

            <div id="site-columns">
                <div class="site-column">
                    <ul>
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
                </div>
            </div>

            <div id="site-footer">
                <img src="/images/dylanbksp_logo_ext.png" alt="dylanbksp" width=128 height=34 id="dylanbksp-logo-footer">
            </div>
        </div>
        
    </div>

</div>