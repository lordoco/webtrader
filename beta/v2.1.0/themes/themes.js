define(["jquery","windows/windows","highstock","jquery-growl"],function(a,b){var c=null,d=local_storage.get("webtrader_theme");return d=d&&d.name,d&&require(["lib/highstock/themes/"+d]),a("a.theme_dark_blue, a.theme_dark_green, a.theme_dark_unica, a.theme_gray, a.theme_grid, a.theme_grid_light, a.theme_sand_signika, a.theme_skies, a.theme_default").off("click").on("click",function(){var d=a(this);if(c)c.moveToTop();else{c=b.createBlankWindow(a('<div class="dialog-confirm-new-theme"/>'),{title:"Apply new theme?",width:360,height:170,resizable:!1,collapsable:!1,minimizable:!1,maximizable:!1,closable:!1,closeOnEscape:!1,modal:!0,ignoreTileAction:!0,"data-authorized":"true",destroy:function(){c=null},buttons:{Apply:function(){a.growl.notice({message:"Loading "+d.text()});var b=d.attr("class").replace("theme_","").replace("_","-");"default"===b?local_storage.remove("webtrader_theme"):local_storage.set("webtrader_theme",{name:b}),location.reload()},Cancel:function(){a(this).dialog("destroy")}}});var e=a("<p>In order to properly apply theme, a full refresh of page is required. Are you sure you want to proceed?</p>");e.appendTo(c),c.dialog("open")}}),{}});