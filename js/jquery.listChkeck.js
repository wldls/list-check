(function($){
	var defaults = {
		chkBox: '.list_chk',
		chkAll: '.list_chk_all',
		isAll:false,
		// notClick:false,
		bgRow:false,
		bgCls:'bg_blue',
		afterCheck:function(e){},
		afterCheckAll:function(e){}
	}

	function Plugin(element, options){		
		this.w = $(document);
		this.e = $(element);		
		this.options = $.extend({}, defaults, options);
		this.init();
	}

	Plugin.prototype = {
		init: function(){
			var that = this,
				opt = that.options,
				$element = that.e

			if(opt.notClick){
				that.checkEvent();
			}else{
				$element.on('click', function(e){
					var target = $(e.target);
					if(target.attr('data-use') === 'N'){
						return false;
					}
					that.checkEvent(e);
				});
			}
		},
		checkEvent: function(e){
			var that = this,
				opt = that.options;

			if(opt.isAll){
				// 전체선택할 때 하위 체크박스 모두선택
				if($(opt.chkAll).prop('checked')){
					$(opt.chkBox).prop('checked', true);
					if(opt.bgRow){
						// 체크된 tr에 bg색상 변경						
						$(opt.chkBox).parents('tr').addClass(opt.bgCls);
					}
				}else{					
					$(opt.chkBox).prop('checked', false);
					if(opt.bgRow){
						$(opt.chkBox).parents('tr').removeClass(opt.bgCls);
					}
				}

				opt.afterCheckAll.call(this, e);

			}else if(!opt.isAll){
				// 체크된 tr에 bg색상 변경
				var $target = $(e.target),
					$targetTr = $target.parents('tr'),
					isChecked = $target.prop('checked');

				if(opt.bgRow && isChecked){
					$targetTr.addClass(opt.bgCls);
				}else if(opt.bgRow && !isChecked){
					$targetTr.removeClass(opt.bgCls);
				}

				// 체크박스 모두 선택시 전체선택 checked
				if($(opt.chkBox).not(':checked').length > 0){
					$(opt.chkAll).prop('checked', false);
				}else{
					$(opt.chkAll).prop('checked', true);
				}

				opt.afterCheck.call(this, e);
			}
		}
	}

	$.fn.listCheck = function(options){
		return this.each(function(){
			var plugin = new Plugin(this, options);
		});
	};	
}(jQuery));