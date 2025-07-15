<script lang="ts">
    let { text } = $props();
</script>

<span class="tooltip">
    <img src="/images/tooltip_3.gif" alt="tooltip indicator">
    <span class="tooltiptext" style="font-weight: normal">
        {@html text}
    </span>
</span>

<style>
    .tooltip {
        position: relative;
        display: inline-block;
        border-bottom: 1px dotted black;
    }
    .tooltip .tooltiptext {
        visibility: hidden;
        width: 210px;
        background-color: #FFFFFF;
        padding: 10px;
        border: solid 1px #999999;
        box-shadow: 5px 5px #00000020;
        text-align: left;
        
        position: absolute;
        z-index: 1;
        bottom: 150%;
        left: 50%;
        margin-left: calc(-105px - 10px);
    }
    .tooltip .tooltiptext::before {
        content: " ";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -6px;
        border-width: 6px;
        border-style: solid;
        border-color: #999999 transparent transparent transparent;
    }
    .tooltip .tooltiptext::after {
        content: " ";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: #FFFFFF transparent transparent transparent;
    }
    .tooltip:hover .tooltiptext {
        visibility: visible;
    }
</style>